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
    if (!request.url.includes('/chatbot/query') && !request.url.includes('/search')) {
      this.loadingSerice.show();
    }
    const token = localStorage.getItem('token');
    var modifiedRequest=request
    // if(token){
    //   modifiedRequest= request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json"
    //     }
    //   });
    // }
    return next.handle(modifiedRequest).pipe(
      finalize(() => {
        this.loadingSerice.hide();
      })
    );
  }
}
