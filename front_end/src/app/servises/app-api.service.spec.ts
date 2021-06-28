import { TestBed } from '@angular/core/testing';

import { AppAPIService } from './app-api.service';

describe('AppAPIService', () => {
  let service: AppAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
