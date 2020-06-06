import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Match} from "./match";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private http: HttpClient
  ) { }

  getAll():Observable<Match[]> {
    const url = "http://localhost:8080/rest/api/v1/match/all";
    return this.http.get<Match[]>(url, {});
  }

  getMatchById(id: string): Observable<Match> {
    console.log(id);
    const url = "http://localhost:8080/rest/api/v1/match/"+id;
    return this.http.get<Match>(url, {});
  }
}
