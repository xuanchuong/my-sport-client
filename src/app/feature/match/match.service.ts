import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Match} from "./match";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TokenInterceptor} from "../../core/auth/token.interceptor";
import {AuthService} from "../../core/auth/auth.service";

@Injectable({
	providedIn: 'root'
})
export class MatchService {

	private readonly API_BASE: string = '/rest/api/v1/match';
	private readonly JOIN_MATCH_URL = this.API_BASE + '/join';
	private readonly CREATE_MATCH_URL = this.API_BASE + "/create";
	private readonly ALL_MATCH_URL = this.API_BASE + "/all";

	constructor(
		private http: HttpClient,
		private authService: AuthService
	) {
		TokenInterceptor.init(authService);
	}

	getAll(): Observable<Match[]> {
		return this.http.get<Match[]>(this.ALL_MATCH_URL, {});
	}

	getMatchById(id: string): Observable<Match> {

		console.log(id);
		const url = this.API_BASE + '/' + id;
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
		return this.http.post<Match>(this.CREATE_MATCH_URL, body, httpOptions).toPromise();
	}

	delete(matchId: number): Promise<boolean> {
		let params = new HttpParams();
		params.set("id", matchId.toString());
		return this.http.delete<boolean>(this.API_BASE + "?id=" + matchId).toPromise();
	}

	joinTheMatch(matchId: number): Promise<boolean> {
		return this.http.put<boolean>(this.JOIN_MATCH_URL + '?matchId=' + matchId, {}, {})
			.toPromise();
	}
}
