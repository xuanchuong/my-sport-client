import {Injectable} from '@angular/core';
import {StoreService} from './store-service';
import {ConfigService} from './config.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../core/auth/user";

export class UserServiceFilter {
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService extends StoreService<User> {

  signinUrl: string;

  constructor(http: HttpClient, config: ConfigService) {
    console.log('init userservice');
    super(User, http, config.config.serverUrl + 'users', config.config.serverUrl + 'users/search');
    this.signinUrl = config.config.signinUrl;
  }

  prepareData(item: User): Object {
    return item;
  }
  applyFilter(url: string, filter: UserServiceFilter, params: HttpParams): { url: string; params: HttpParams; } {
    if (filter && filter.email) {
      url = this.searchUrl;
      params = params.set('email', filter.email);
    }
    return { url, params };
  }

  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.collectionUrl + '/findByEmail', { params: new HttpParams().set('email', email) });
  }

  signin(user: User): Promise<User> {
    const data = {
      'firstName': user.firstName,
          'lastName':user.lastName,
          'matchingPassword':user.matchingPassword,
          'email':user.email,
          'password':user.password
    }
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    return this.http.post<User>(this.signinUrl, body, httpOptions).toPromise();
  }
}
