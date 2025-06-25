import { TestBed } from '@angular/core/testing';

import { UploadresumeService } from './uploadresume.service';

describe('UploadresumeService', () => {
  let service: UploadresumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadresumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
