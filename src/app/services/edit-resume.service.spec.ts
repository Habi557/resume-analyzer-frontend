import { TestBed } from '@angular/core/testing';

import { EditResumeService } from './edit-resume.service';

describe('EditResumeService', () => {
  let service: EditResumeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditResumeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
