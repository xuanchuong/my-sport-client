import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {UserService} from "../../../shared/user.service";

@Component({
	selector: 'app-resetpass',
	templateUrl: './resetpass.component.html',
	styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent implements OnInit {

	email: FormControl = new FormControl('', [Validators.required, Validators.email]);

	constructor(private userService: UserService) {
	}

	ngOnInit(): void {
	}

	sendResetRequest() {
		this.userService.resetPassword(this.email.value).then(result => {
			if (result) {
				console.log('success');
			}
		}, error => {
			console.error(error);
		})
	}
}
