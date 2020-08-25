import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/auth/user";
import {AuthService} from "../../../core/auth/auth.service";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  templateUrl: './profile.detail.component.html',
  styleUrls: ['./profile.detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  currentUser$: BehaviorSubject<User>;

  constructor(
      private authService: AuthService,
      private router: Router
  ) {
  }

  ngOnInit() {
    this.currentUser$ = this.authService.getLoggedUser();
  }

  startEditingAccount() {
    this.router.navigate(['/profile/editing']).then();
  }
}
