import {Component, OnInit} from '@angular/core';
import {Match} from "../match";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchService} from "../match.service";
import {FormGroup} from "@angular/forms";

@Component({
	selector: 'app-match-detail',
	templateUrl: './match-detail.component.html',
	styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {
	match: Match;
	deleteForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private matchService: MatchService,
	) {
	}

	ngOnInit() {
		this.deleteForm = new FormGroup({});
		this.route.paramMap.subscribe(params => {
			this.matchService.getMatchById(params.get('matchId')).subscribe(match => {
				this.match = match;
			})
		})
	}

	onSubmit() {
		console.log("delete match");
		this.matchService.delete(this.match.id).then(result => {
			if (result) {
				this.router.navigate(['/home']);
			}
		})
	}

}
