import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfigService} from "../../services/config.service";

describe('AuthService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [
			RouterTestingModule,
			HttpClientTestingModule
		],
		providers: [ConfigService]
	}));

	it('should be created', () => {
		const service: AuthService = TestBed.inject(AuthService);
		expect(service).toBeTruthy();
	});
});
