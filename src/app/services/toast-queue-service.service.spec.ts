import { TestBed } from '@angular/core/testing';

import { ToastQueueServiceService } from './toast-queue-service.service';

describe('ToastQueueServiceService', () => {
  let service: ToastQueueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastQueueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
