import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, EMPTY, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';
import {map, skipWhile, switchMap, tap} from 'rxjs/operators';
import {User} from './user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TokenInterceptor} from './token.interceptor';
import {UserService} from '../../services/user.service';
import * as auth0 from 'auth0-js';
import {environment} from '../../../environments/environment';

const ACCESS_TOKEN_KEY = 'access_token';
const refreshTokenKey = 'refresh_token';
const RESOURCE_URL = `${environment.auth.domain}/oauth/token`;
const clientID = `${environment.auth.clientID}`;
const clientSecret = `${environment.auth.clientSecret}`;

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
        private userService: UserService
    ) {
        console.log('init auth');
        this.jwtHelper = new JwtHelperService();
        TokenInterceptor.init(this);
        this.initAccessTokenPipe();
        this.initLoggedUserPipe();
        this.initLoggedInPipe();
    }

    private initAccessTokenPipe() {
        this.accessTokenSubject = new BehaviorSubject(this.accessToken);
        this.accessToken$ = this.accessTokenSubject.asObservable().pipe(
            switchMap(token => {
                if (token && this.jwtHelper.isTokenExpired(token)) {
                    this.userLoading = true;
                    return this.loadAccessTokenUsingRefreshToken();
                }
                if (token) {
                    this.loggedIn.next(true);
                }
                return token ? of(token) : EMPTY;
            }),
        );
    }

    private initLoggedUserPipe() {
        console.log('initLoggedUserPipe');
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
                console.log('load logged User subject');
                this.userLoading = false;
                this.loggedUserSubject.next(user);
            });
    }

    private initLoggedInPipe() {
        this.accessTokenSubject.asObservable().pipe(
            tap(() => this.loggedIn.next(true))
        );
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable(); // {2}
    }

    getLoggedUser(): BehaviorSubject<User> {
        return this.loggedUserSubject;
    }

    private loadAccessTokenUsingRefreshToken(): Observable<string> {
        const token = localStorage.getItem(refreshTokenKey);
        if (!token || this.jwtHelper.isTokenExpired(token)) {
            console.log('refresh token expired: must logout');
            this.logout().then();
            return EMPTY;
        }
        return this.loadAccessToken(false, token);
    }

    private get accessToken(): string {
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        let accessToken: string = null;
        console.log('token: ' + token);
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            accessToken = token;
        }
        console.log('access token: ' + accessToken);
        return accessToken;
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
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(refreshTokenKey);
        this.accessTokenSubject.next(null);
    }

    private storeToken(jwt: any): string {
        console.log('store new key');
        if (jwt && jwt[ACCESS_TOKEN_KEY]) {
            const accessToken = jwt[ACCESS_TOKEN_KEY];
            if (jwt[refreshTokenKey]) {
                localStorage.setItem(refreshTokenKey, jwt[refreshTokenKey]);
            }
            localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
            this.accessTokenSubject.next(accessToken);
            return accessToken;
        }
        console.log('token invalid');
        return null;
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
            Authorization: 'Basic ' + btoa(`${clientID}:${clientSecret}`),
            'Access-Control-Allow-Origin': '*'
        });

        return this.http.post<any>(RESOURCE_URL, params, {headers}
        ).pipe(
            map(jwt => {
                this.loggedIn.next(true);
                return this.storeToken(jwt);
            })
        );
    }

    interceptUrl(req: HttpRequest<any>): boolean {
        return req.url.includes('/rest/api/v1/')
            && !req.url.endsWith('/rest/api/v1/user/create')
            && !req.url.endsWith('/rest/api/v1/user/resetPass')
            && !req.url.endsWith('/rest/api/v1/match/all')
            && !req.headers.get('Authorization');
    }
}
