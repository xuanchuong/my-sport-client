import {Component, OnInit} from '@angular/core';
import {Match} from "../match";
import {ActivatedRoute, Router} from "@angular/router";
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
		private router: Router,
		private matchService: MatchService,
	) {
	}

	ngOnInit() {
		this.route.paramMap.subscribe(params => {
			this.matchService.getMatchById(params.get('matchId')).subscribe(match => {
				this.match = match;
			})
		})
	}

	deleteTheMatch() {
		console.log("delete match");
		this.matchService.delete(this.match.id).then(result => {
			if (result) {
				this.router.navigate(['/home']);
			}
		})
	}

	joinTheMatch() {
		console.log("join the match");
		this.matchService.joinTheMatch(this.match.id).then(result => {
			if (result) {
				this.router.navigate(['/home']);
			}
		}, error => {
			console.error(error);
		});
	}
}
