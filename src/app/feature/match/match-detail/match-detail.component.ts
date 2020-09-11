import {Component, OnInit} from '@angular/core';
import {Match} from "../match";
import {ActivatedRoute, Router} from "@angular/router";
import {MatchService} from "../match.service";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
    selector: 'app-match-detail',
    templateUrl: './match-detail.component.html',
    styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent implements OnInit {

    match: Match;
    joined$: BehaviorSubject<boolean>;
    isMatchOwner$: BehaviorSubject<boolean>;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private matchService: MatchService,
        private authService: AuthService
    ) {
    }

    ngOnInit(): void {
        this.joined$ = new BehaviorSubject<boolean>(false);
        this.isMatchOwner$ = new BehaviorSubject<boolean>(false);
        this.route.paramMap.subscribe(params => {
            this.matchService.getMatchById(params.get('matchId')).subscribe(match => {
                const sessionUser = this.authService.getLoggedUser().getValue();
                this.match = match;
                this.match.participants.forEach(participant => {
                    if (participant.id === sessionUser.id) {
                        this.joined$.next(true);
                    }
                })
                if (this.match.owner.id === sessionUser.id) {
                    this.isMatchOwner$.next(true);
                }
            })
        })
    }

    deleteTheMatch() {
        this.matchService.delete(this.match.id).then(() => {
            this.router.navigate(['/home']).then();
        })
    }

    joinTheMatch() {
        this.matchService.joinTheMatch(this.match.id).subscribe(result => {
            this.joined$.next(true);
            this.match = result;
        }, error => {
            console.error(error);
        });
    }


    leaveTheMatch() {
        this.matchService.leaveTheMatch(this.match.id).subscribe(result => {
            this.joined$.next(false);
            this.match = result;
        }, error => {
            console.error(error);
        });
    }

    cancelTheMatch() {
        this.matchService.cancelTheMatch(this.match.id).subscribe(result => {
            this.router.navigate(['/home']).then();
        });
    }
}
