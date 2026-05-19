// polling.service.ts
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, timer } from 'rxjs';
import { switchMap, takeUntil, takeWhile, share, tap } from 'rxjs/operators';
import { AnalyzeStatus } from '../models/AnalyzeStatus';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class PollingService implements OnDestroy {
  private stopPolling$ = new Subject<void>();
 
  constructor(private http: HttpClient) {}

  pollJobStatus(jobId: string, intervalMs = 3000): Observable<AnalyzeStatus> {
    return timer(0, intervalMs).pipe(
      switchMap(() =>
        this.http.get<AnalyzeStatus>(`${environment.apiUrl}analyze/status/${jobId}`)
      ),
      takeWhile(
        (res) => res.status !== 'COMPLETED' && res.status !== 'FAILED',
        true  // emit the final value that fails the condition
      ),
      takeUntil(this.stopPolling$),
      share()  // multicast — multiple subscribers share one HTTP stream
    );
  }
  stopAll(): void {
    this.stopPolling$.next();
    this.stopPolling$.complete();
    this.stopPolling$ = new Subject<void>();  }

  ngOnDestroy(): void {
    this.stopAll();
  }
}