import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {Match} from "../match";
import {MatchService} from "../match.service";
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";


@Component({
	selector: 'app-match-creation',
	templateUrl: './match-creation.component.html',
	styleUrls: ['./match-creation.component.scss'],
	providers: [DatePipe]
})
export class MatchCreationComponent implements OnInit {
	form: FormGroup;
	submitted = false;

	constructor(
		private router: Router,
		private matchService: MatchService,
		private datePipe: DatePipe
	) {
	}

	ngOnInit() {
		this.form = new FormGroup({
			title: new FormControl('', Validators.required),
			startDate: new FormControl('', [Validators.required, this.validateStartDate]),
			location: new FormControl('', [Validators.required]),
			description: new FormControl('', [Validators.required]),
			numberOfPlayers: new FormControl('', [Validators.required, Validators.min(5)]),
		})
	}

	validateStartDate(control: AbstractControl): { [key: string]: boolean } | null {
		if (control.value !== undefined && (isNaN(control.value))) {
			console.log("validate: " + control.value);
			const varDate = new Date(control.value); //dd-mm-YYYY
			let today = new Date();
			today.setHours(0, 0, 0, 0);
			if (varDate < today) {
				return { 'invalidDate': true };
			}
		}
		return null;
	}

	get f() {
		return this.form.controls;
	}

	onSubmit() {
		this.submitted = true;
		if (this.form.invalid) {
			return;
		}
		const match = new Match();
		match.title = this.form.value.title;
		match.startDate = this.form.value.startDate;
		match.location = this.form.value.location;
		match.description = this.form.value.description;
		match.numberOfPlayers = this.form.value.numberOfPlayers;

		this.matchService.create(match)
			.then(match => {
				if (match == undefined) {
					throw new Error("create fail");
				}
				this.router.navigate(['/home']);
			})
			.catch(error => {
				alert(error);
			})
	}
}
