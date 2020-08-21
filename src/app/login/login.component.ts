import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../core/auth/auth.service';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup;
	private loadingSubject: BehaviorSubject<boolean>;

	ngOnInit() {
		this.form = new FormGroup({
			username: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', Validators.required),
		});
	}

	constructor(
		private authService: AuthService,
		private router: Router
	) {
		this.loadingSubject = new BehaviorSubject<boolean>(false);
	}

	onSubmit() {
		this.authService.login(this.form.value.username, this.form.value.password)
			.then(() => {
					this.router.navigate(['/']).then();
				},
				error => {
					console.error(error);
					this.loadingSubject.next(false);
				});
	}

}
