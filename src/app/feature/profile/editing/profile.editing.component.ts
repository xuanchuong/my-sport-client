import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {User} from "../../../core/auth/user";
import {Observable} from "rxjs";

@Component({
	selector: 'app-editing',
	templateUrl: './profile.editing.component.html',
	styleUrls: ['./profile.editing.component.scss']
})
export class ProfileEditingComponent implements OnInit {

	form: FormGroup;
	submitted: boolean = false;
	user: Observable<User>;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService
	) {
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			phoneNumber: ['', [Validators.required]],
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(6)]],
		});
		this.authService.getLoggedUser().subscribe((user => {
			if (user) {
				this.form.patchValue(user)
			}
		}));

	}

	get f() {
		return this.form.controls;
	}

	updateAccount() {
		console.log('update account');
	}
}
