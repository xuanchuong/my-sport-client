import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";
import {ConfigService} from "../../services/config.service";
import {map, skipWhile, switchMap, tap} from 'rxjs/operators';
import {User} from "./user";
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenInterceptor} from './token.interceptor';
import {UserService} from "../../services/user.service";
import * as auth0 from 'auth0-js';
import {environment} from "../../../environments/environment";

const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private jwtHelper: JwtHelperService;
	private accessTokenSubject: BehaviorSubject<string>;
	accessToken$: Observable<string>;
	private userLoading = false;
	private loggedUserSubject: BehaviorSubject<User>;
	loggedUser$: Observable<User>;
	private loggedIn = new BehaviorSubject<boolean>(false);
	auth0 = new auth0.WebAuth({
		clientID: environment.auth.clientID,
		domain: environment.auth.domain,
		responseType: 'token',
		redirectUri: environment.auth.redirect,
		audience: environment.auth.audience,
		scope: environment.auth.scope
	});

	constructor(
		private router: Router,
		private http: HttpClient,
		private config: ConfigService,
		private userService: UserService
	) {
		console.log('init auth');
		this.jwtHelper = new JwtHelperService();
		TokenInterceptor.init(this);
		this.initAccessTokenPipe();
		this.initLoggedUserPipe();
		this.initLoggedInPipe();
	}

	get isLoggedIn() {
		return this.loggedIn.asObservable(); // {2}
	}

	getLoggedUser(): User {
		return this.loggedUserSubject.value;
	}

	private initLoggedInPipe() {
		if (this.getToken(accessTokenKey)) {
			console.log('token is available');
			this.loggedIn.next(true);
		}
	}

	private initAccessTokenPipe() {
		this.accessTokenSubject = new BehaviorSubject(this.accessToken);
		this.accessToken$ = this.accessTokenSubject.asObservable().pipe(
			switchMap(token => {
				console.log(`check token valid or not ${!!token}`);
				if (token && this.jwtHelper.isTokenExpired(token)) {
					this.userLoading = true;
					return this.loadAccessTokenUsingRefreshToken();
				}
				console.log(`access token available ${!!token}`);
				if (token) {
					this.loggedIn.next(true);
				}
				return token ? of(token) : EMPTY;
			}),
		);
	}

	private loadAccessTokenUsingRefreshToken(): Observable<string> {
		const token = this.getToken(refreshTokenKey);
		if (!token || this.jwtHelper.isTokenExpired(token)) {
			console.log('refresh token expired: must logout');
			this.logout();
			return EMPTY;
		}
		return this.loadAccessToken(false, token);
	}

	private get accessToken(): string {
		const token = this.getToken(accessTokenKey);
		return token && !this.jwtHelper.isTokenExpired(token) ? token : null;
	}

	private getToken(key: string): string {
		return localStorage.getItem(key);
	}

	private initLoggedUserPipe() {
		this.loggedUserSubject = new BehaviorSubject<User>(null);
		this.userLoading = true;
		this.loggedUser$ = this.loggedUserSubject.asObservable().pipe(
			skipWhile(() => {
				return this.userLoading;
			}),
		);
		this.accessTokenSubject.asObservable().pipe(
			tap(() => this.userLoading = true),
			switchMap(token => this.extractLoggedUser(token)))
			.subscribe(user => {
				this.userLoading = false;
				this.loggedUserSubject.next(user);
			});
	}

	private extractLoggedUser(accessToken): Observable<User> {
		if (accessToken) {
			const data = this.jwtHelper.decodeToken(accessToken);
			if (data) {
				return this.userService.findByEmail(data.user_name);
			}
		}
		return of(null);
	}


	login(username: string, password: string): Promise<string> {
		return this.loadAccessToken(true, null, username, password).toPromise();
	}

	logout(): Promise<boolean> {
		this.loggedIn.next(false);
		this.clearToken();
		return this.router.navigate(['/login']);
	}

	private clearToken() {
		localStorage.removeItem(accessTokenKey);
		localStorage.removeItem(refreshTokenKey);
		this.accessTokenSubject.next(null);
	}

	private storeToken(jwt: any): string {
		console.log('store new key')
		if (jwt && jwt[accessTokenKey]) {
			const accessToken = jwt[accessTokenKey];
			if (jwt[refreshTokenKey]) {
				this.setToken(refreshTokenKey, jwt[refreshTokenKey]);
			}
			this.setToken(accessTokenKey, accessToken);
			this.accessTokenSubject.next(accessToken);
			return accessToken;
		}
		console.log('token invalid');
		return null;
	}

	private setToken(key: string, token: string) {
		localStorage.setItem(key, token);
	}

	private loadAccessToken(retrieveAccessToken: boolean, refreshToken?: string, username?: string, password?: string):
		Observable<string> {
		const params = retrieveAccessToken ?
			new HttpParams()
				.set('username', username)
				.set('password', password)
				.set('grant_type', 'password') :
			new HttpParams()
				.set(refreshTokenKey, refreshToken)
				.set('grant_type', refreshTokenKey);
		const headers = new HttpHeaders({
			'Authorization': 'Basic ' + btoa(`${this.config.config.clientId}:${this.config.config.clientSecret}`),
			'Access-Control-Allow-Origin': '*'
		});

		return this.http.post<any>(this.config.config.loginUrl, params, {headers}
		).pipe(
			map(jwt => {
				this.loggedIn.next(true);
				return this.storeToken(jwt);
			})
		)
	}

	interceptUrl(req: HttpRequest<any>): boolean {
		return req.url.includes(this.config.config.API_BASE)
			&& !req.url.startsWith(this.config.config.signinUrl)
			&& !req.url.endsWith('/rest/api/v1/match/all')
			&& !req.headers.get('Authorization');
	}
}
