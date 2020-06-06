import { Component, OnInit } from '@angular/core';
import {MatchService} from "../match/match.service";
import {Match} from "../match/match";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  availableMatches: Match[];
  constructor(
    private matchService: MatchService
  ) { }

  ngOnInit() {
    this.matchService.getAll().subscribe(matchs => {
      this.availableMatches = matchs;
    })
  }

}
