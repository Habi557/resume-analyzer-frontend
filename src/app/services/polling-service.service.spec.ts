import { TestBed } from '@angular/core/testing';

import { PollingServiceService } from './polling-service.service';

describe('PollingServiceService', () => {
  let service: PollingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PollingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
