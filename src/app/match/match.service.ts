import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Match} from "./match";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenInterceptor} from "../core/auth/token.interceptor";
import {AuthService} from "../core/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  createMatchUrl: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    TokenInterceptor.init(authService);
    this.createMatchUrl = "http://localhost:8080/rest/api/v1/match/create";
  }

  getAll():Observable<Match[]> {
    const url = "http://localhost:8080/rest/api/v1/match/all";
    return this.http.get<Match[]>(url, {});
  }

  getMatchById(id: string): Observable<Match> {
    console.log(id);
    const url = "http://localhost:8080/rest/api/v1/match/"+id;
    return this.http.get<Match>(url, {});
  }

  create(match: Match): Promise<Match> {
    const data = {
      "startDate":match.startDate,
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
}
