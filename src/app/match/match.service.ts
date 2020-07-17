import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Match} from "./match";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TokenInterceptor} from "../core/auth/token.interceptor";
import {AuthService} from "../core/auth/auth.service";
import {map} from "rxjs/operators";

@Injectable({
	providedIn: 'root'
})
export class MatchService {

	createMatchUrl: string;
	private matchURL: string;

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {
		TokenInterceptor.init(authService);
		this.matchURL = "http://localhost:8080/rest/api/v1/match";
		this.createMatchUrl = "http://localhost:8080/rest/api/v1/match/create";
	}

	getAll(): Observable<Match[]> {
		const url = "http://localhost:8080/rest/api/v1/match/all";
		return this.http.get<Match[]>(url, {});
	}

	getMatchById(id: string): Observable<Match> {

		console.log(id);
		const url = "http://localhost:8080/rest/api/v1/match/" + id;
		return this.http.get<Match>(url, {});
	}

	create(match: Match): Promise<Match> {
		const data = {
			"startDate": match.startDate,
			"location": match.location,
			"title": match.title,
			"description": match.description,
			"numberOfPlayers": match.numberOfPlayers
		}
		const body = JSON.stringify(data);
		const httpOptions = {
			headers: new HttpHeaders({'Content-Type': 'application/json'})
		}
		return this.http.post<Match>(this.createMatchUrl, body, httpOptions).toPromise();
	}

	delete(matchId: number): Promise<boolean> {
		let params = new HttpParams();
		params.set("id", matchId.toString());
		return this.http.delete<boolean>(this.matchURL + "?id=" + matchId).toPromise();
	}
}
