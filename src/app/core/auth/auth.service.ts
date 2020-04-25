import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ConfigService} from "../../services/config.service";
import { map } from 'rxjs/operators';
import {User} from "./user";


const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedOut = new BehaviorSubject<boolean>(true);
  private loggedUserSubject: BehaviorSubject<User>;

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  get isLoggedOut() {
    return this.loggedOut.asObservable(); // {2}
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private config: ConfigService) {
    this.initLoggedUserPipe();
  }

  private initLoggedUserPipe() {
    this.loggedUserSubject = new BehaviorSubject<User>(null);
  }

  login(username: string, password: string): Promise<string> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(`${this.config.config.clientId}:${this.config.config.clientSecret}`)
    });

    return this.http.post<any>(this.config.config.loginUrl, params, { headers }
    ).pipe(
      map(jwt => {
        return AuthService.storeToken(jwt);
      })
    )
      .toPromise();
  }

  logout(): Promise<boolean> {
    console.log('logout');
    this.loggedIn.next(false);
    this.loggedOut.next(true);
    return this.router.navigate(['/login']);
  }

  private static storeToken(jwt: any): string {
    if (jwt && jwt[accessTokenKey]) {
      const accessToken = jwt[accessTokenKey];
      if (jwt[refreshTokenKey]) {
        AuthService.setToken(refreshTokenKey, jwt[refreshTokenKey]);
      }
      AuthService.setToken(accessTokenKey, accessToken);
      return accessToken;
    }
    return null;
  }

  private static setToken(key: string, token: string) {
    localStorage.setItem(key, token);
  }
}
