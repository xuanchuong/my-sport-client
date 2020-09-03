import { TestBed } from '@angular/core/testing';

import { MatchService } from './match.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('MatchService', () => {

	beforeEach(() => TestBed.configureTestingModule({
		imports: [HttpClientTestingModule, RouterTestingModule],
	}));

	it('should be created', () => {
		const service: MatchService = TestBed.inject(MatchService);
		expect(service).toBeTruthy();
	});
});
