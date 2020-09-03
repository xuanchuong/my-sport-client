import {Component} from '@angular/core';
import {Match} from "../match";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchService} from "../match.service";
import {User} from "../../../core/auth/user";
import {UserService} from "../../../shared/user.service";

@Component({
	selector: 'app-match-detail',
	templateUrl: './match-detail.component.html',
	styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent {

	match: Match;
	owner: User;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private matchService: MatchService,
		private userService: UserService
	) {
		this.route.paramMap.subscribe(params => {
			this.matchService.getMatchById(params.get('matchId')).subscribe(match => {
				this.match = match;
				this.userService.getById(match.ownerId).subscribe(owner => {
					this.owner = owner;
				})
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
