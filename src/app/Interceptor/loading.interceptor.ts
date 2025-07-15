import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loadingSerice: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip showing spinner for certain requests
    if (!request.url.includes('/chatbot/query')) {
      this.loadingSerice.show();
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.loadingSerice.hide();
      })
    );
  }
}
