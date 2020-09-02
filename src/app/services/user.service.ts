import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from '../core/auth/user';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

export const RESOURCE_URL = `${environment.API_URL}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  private static buildBodyRequest(user: User): string {
    const data = {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      password: user.password
    };
    return JSON.stringify(data);
  }

  findByEmail(email: string): Observable<User> {
    return this.http.get<User>(RESOURCE_URL, {params: new HttpParams().set('email', email)});
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${RESOURCE_URL}/get`, {params: new HttpParams().set('id', String(id))});
  }

  create(user: User): Promise<User> {
    const body = UserService.buildBodyRequest(user);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.post<User>(`${RESOURCE_URL}/create`, body, httpOptions).toPromise();
  }

  update(user: User): Promise<boolean> {
    const body = UserService.buildBodyRequest(user);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return this.http.put<boolean>(`${RESOURCE_URL}/update`, body, httpOptions).toPromise();
  }

  resetPassword(email: string): Promise<boolean> {
    return this.http.post<boolean>(`${RESOURCE_URL}/resetPass?email=${email}`, {}).toPromise();
  }
}
