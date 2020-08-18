import {Component, OnInit} from '@angular/core';
import {User} from "../../../../core/auth/user";
import {AuthService} from "../../../../core/auth/auth.service";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	currentUser: User;
	navigatorItems: string[] = [
		"profile", "Password"
	];

	constructor(private authService: AuthService) {
	}

	ngOnInit() {
		this.currentUser = new User();
		Object.assign(this.currentUser, this.authService.getLoggedUser())
	}
}