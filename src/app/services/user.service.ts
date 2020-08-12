import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {User} from "../core/auth/user";
import {Observable} from "rxjs";
import {ConfigService} from "./config.service";

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private readonly API_BASE: string = '/rest/api/v1';
	private readonly USER_API: string = '/user';

	constructor(private http: HttpClient, private config: ConfigService) {
	}

	private get url(): string {
		return `${this.config.config.serverUrl}${this.API_BASE}${this.USER_API}`;
	}

	findByEmail(email: string): Observable<User> {
		return this.http.get<User>(this.url, { params: new HttpParams().set('email', email) });
	}

	signin(user: User): Promise<User> {
		const data = {
			'firstName': user.firstName,
			'lastName': user.lastName,
			'matchingPassword': user.matchingPassword,
			'email': user.email,
			'password': user.password
		}
		const body = JSON.stringify(data);
		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'})
		}
		return this.http.post<User>(`${this.url}/create`, body, httpOptions).toPromise();
	}
}
