import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninComponent } from './signin.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfigService} from "../services/config.service";

describe('SigninComponent', () => {
	let component: SigninComponent;
	let fixture: ComponentFixture<SigninComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ SigninComponent ],
			imports: [RouterTestingModule, ReactiveFormsModule, HttpClientTestingModule],
			providers:[ConfigService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SigninComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
