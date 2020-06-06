import { TestBed } from '@angular/core/testing';

import { RequestHeadersInterceptorService } from './request-headers-interceptor.service';

describe('RequestHeadersInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RequestHeadersInterceptorService = TestBed.get(RequestHeadersInterceptorService);
    expect(service).toBeTruthy();
  });
});
