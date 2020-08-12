import {inject, TestBed} from '@angular/core/testing';

import {RequestHeadersInterceptorService} from './request-headers-interceptor.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HTTP_INTERCEPTORS, HttpClient} from "@angular/common/http";

describe('RequestHeadersInterceptorService', () => {
	beforeEach(() => TestBed.configureTestingModule({
		imports: [HttpClientTestingModule],
		providers: [
			HttpClient,
			{
				provide: HTTP_INTERCEPTORS,
				useClass: RequestHeadersInterceptorService,
				multi: true,
			}
		],
	}));

	it('should be created', inject([HTTP_INTERCEPTORS], (service: RequestHeadersInterceptorService) => {
		expect(service).toBeTruthy();
	}));
});
