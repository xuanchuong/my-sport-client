import { TestBed } from '@angular/core/testing';

import { MatchService } from './match.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ConfigService} from "../../services/config.service";

describe('MatchService', () => {

	beforeEach(() => TestBed.configureTestingModule({
		imports: [HttpClientTestingModule, RouterTestingModule],
		providers: [ConfigService]
	}));

	it('should be created', () => {
		const service: MatchService = TestBed.inject(MatchService);
		expect(service).toBeTruthy();
	});
});
