import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Match} from './match';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TokenInterceptor} from '../../core/auth/token.interceptor';
import {AuthService} from '../../core/auth/auth.service';
import {environment} from '../../../environments/environment';

export const RESOURCE_URL = `${environment.API_URL}/match`;

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    private readonly JOIN_MATCH_URL = RESOURCE_URL + '/join';
    private readonly CREATE_MATCH_URL = RESOURCE_URL + '/create';
    private readonly ALL_MATCH_URL = RESOURCE_URL + '/all';

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
        const url = RESOURCE_URL + '/' + id;
        return this.http.get<Match>(url, {});
    }

    create(match: Match): Promise<Match> {
        const data = {
            startDate: match.startDate,
            location: match.location,
            title: match.title,
            description: match.description,
            numberOfPlayers: match.numberOfPlayers
        };
        const body = JSON.stringify(data);
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this.http.post<Match>(this.CREATE_MATCH_URL, body, httpOptions).toPromise();
    }

    delete(matchId: number): Promise<boolean> {
        const params = new HttpParams();
        params.set('id', matchId.toString());
        return this.http.delete<boolean>(RESOURCE_URL + '?id=' + matchId).toPromise();
    }

    joinTheMatch(matchId: number): Observable<Match> {
        return this.http.put<Match>(this.JOIN_MATCH_URL + '?matchId=' + matchId, {}, {});
    }

    leaveTheMatch(matchId: number): Observable<Match> {
        return this.http.put<Match>(RESOURCE_URL + '/leave?matchId=' + matchId, {}, {});
    }

    cancelTheMatch(matchId: number): Observable<boolean> {
        return this.http.put<boolean>(RESOURCE_URL + '/cancel?matchId=' + matchId, {}, {});
    }
}
