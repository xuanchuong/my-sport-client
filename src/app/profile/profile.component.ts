import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/auth/auth.service";
import {User} from "../core/auth/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	currentUser: User;
	private profileForm: FormGroup;

	constructor(private authService: AuthService) {
	}

	ngOnInit() {
		this.currentUser = new User();
		Object.assign(this.currentUser, this.authService.getLoggedUser())
		this.init(this.currentUser);
	}

	private init(user: User) {
		console.log(`init profile after user retrieved ${user.email}`);
		this.profileForm = new FormGroup({
			email: new FormControl(user.email,
				{
					validators: [Validators.required, Validators.email]
				})
		});
	}

}
