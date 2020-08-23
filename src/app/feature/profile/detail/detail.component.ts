import {Component, OnInit} from '@angular/core';
import {User} from "../../../core/auth/user";
import {AuthService} from "../../../core/auth/auth.service";

@Component({
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  currentUser: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = new User();
    Object.assign(this.currentUser, this.authService.getLoggedUser())
  }
}
