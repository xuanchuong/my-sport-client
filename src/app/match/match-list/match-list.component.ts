import { Component, OnInit } from '@angular/core';
import {Match} from "../match";
import {MatchService} from "../match.service";

@Component({
    selector: 'app-match-list',
    templateUrl: './match-list.component.html',
    styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

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
