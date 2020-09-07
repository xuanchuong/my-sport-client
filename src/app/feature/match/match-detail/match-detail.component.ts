import {Component, OnInit} from '@angular/core';
import {Match} from "../match";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchService} from "../match.service";
import {BaseUser} from "../../../shared/dto/baseUser";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
	selector: 'app-match-detail',
	templateUrl: './match-detail.component.html',
	styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

	match: Match;
	owner: BaseUser;
	joined$ = new BehaviorSubject<boolean>(false);

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private matchService: MatchService,
        private authService: AuthService
	) {
	}

    ngOnInit(): void {
	    console.log('onInit');
        this.route.paramMap.subscribe(params => {
            this.matchService.getMatchById(params.get('matchId')).subscribe(match => {
                const sessionUser = this.authService.getLoggedUser().getValue();
                this.match = match;
                this.owner = match.owner;
                this.match.participants.forEach(participant => {
                    if (participant.id === sessionUser.id) {
                        this.joined$.next(true);
                    }
                })
            })
        })
    }

	deleteTheMatch() {
		console.log("delete match");
		this.matchService.delete(this.match.id).then(result => {
			if (result) {
				this.router.navigate(['/home']).then();
			}
		})
	}

	joinTheMatch() {
		console.log("join the match");
		this.matchService.joinTheMatch(this.match.id).then(result => {
			if (result) {
				this.joined$.next(true);
			}
		}, error => {
			console.error(error);
		});
	}


    leaveTheMatch() {

    }
}
