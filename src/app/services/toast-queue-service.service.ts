// toast-queue.service.ts
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ToastQueueService {

  private toastQueue$ = new Subject<{
    type: 'success' | 'error';
    message: string;
    title?: string;
  }>();

  constructor(private toastr: ToastrService) {
    this.toastQueue$
      .pipe(
        concatMap(toast => this.showToast(toast))
      )
      .subscribe();
  }

  showSuccess(message: string, title?: string) {
    this.toastQueue$.next({ type: 'success', message, title });
  }

  showError(message: string, title?: string) {
    this.toastQueue$.next({ type: 'error', message, title });
  }

  private showToast(toast: any) {
    return new Promise<void>(resolve => {
      const toastRef =
        toast.type === 'success'
          ? this.toastr.success(toast.message, toast.title)
          : this.toastr.error(toast.message, toast.title);

      toastRef?.onHidden.subscribe(() => resolve());
    });
  }
}
