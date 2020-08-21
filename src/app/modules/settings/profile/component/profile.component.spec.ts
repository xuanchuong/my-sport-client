import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthService} from "../../../../core/auth/auth.service";
import {ConfigService} from "../../../../services/config.service";
import {User} from "../../../../core/auth/user";
import {ProfileModule} from "../profile.module";
import {ProfileComponent} from "./profile.component";

describe('ProfileComponent', () => {
	let component: ProfileComponent;
	let fixture: ComponentFixture<ProfileComponent>;
	let authService: AuthService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProfileComponent],
			imports: [RouterTestingModule, HttpClientTestingModule, ProfileModule],
			providers: [ConfigService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		authService = TestBed.inject(AuthService);
		const loggedUser = new User();
		loggedUser.firstName = 'firstName';
		loggedUser.email = 'email';
		jest.spyOn(authService, 'getLoggedUser').mockReturnValue(loggedUser);

		fixture = TestBed.createComponent(ProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
