import { Component, OnInit } from '@angular/core';
import {Match} from "../match";
import {ActivatedRoute} from "@angular/router";
import {MatchService} from "../match.service";

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
  match: Match;

  constructor(
      private route: ActivatedRoute,
      private matchService: MatchService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.matchService.getMatchById(params.get('matchId')).subscribe(match => {
        this.match = match;
      })
    })
  }

}
