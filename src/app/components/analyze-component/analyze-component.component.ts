import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyzeStatus } from 'src/app/models/AnalyzeStatus';
import { PollingService } from 'src/app/services/polling-service.service';

@Component({
  selector: 'app-analyze-component',
  templateUrl: './analyze-component.component.html',
  styleUrls: ['./analyze-component.component.scss']
})
export class AnalyzeComponent implements OnDestroy {
  status: AnalyzeStatus | null = null;
  private sub: Subscription | null = null;

  constructor(private pollingService: PollingService) {}
  startJob(jobId: string): void {
    this.sub = this.pollingService
      .pollJobStatus(jobId, 3000)
      .subscribe({
        next:     (res) => this.status = res,
        error:    (err) => console.error('Poll failed:', err),
        complete: ()    => console.log('Job finished:', this.status?.status)
      });
  }

  stop(): void {
    this.pollingService.stopAll();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
