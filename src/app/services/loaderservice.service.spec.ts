import { TestBed } from '@angular/core/testing';

import { LoaderserviceService } from './loader.service';

describe('LoaderserviceService', () => {
  let service: LoaderserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
