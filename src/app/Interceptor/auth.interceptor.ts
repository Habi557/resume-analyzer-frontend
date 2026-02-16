import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { LoginService } from '../services/login.service';
import { AuthResponse } from '../models/AuthResponse';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ToastQueueService } from '../services/toast-queue-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private refreshToastShown = false;

  constructor(private loginService: LoginService, private toaster: ToastrService, private router: Router, private toasterQueu: ToastQueueService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Skip auth endpoints
    if (
      req.url.includes('/auth/login') ||
      req.url.includes('/auth/register') ||
      req.url.includes('/auth/refreshToken')
    ) {
      return next.handle(req);
    }

    const accessToken = this.loginService.getAccessToken();
    if (accessToken) {
      req = this.addToken(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse): Observable<HttpEvent<any>> => {
        if (error.status === 401 && !req.url.includes('/auth/refresh') && error.error.message == "Token expired. Please login again.") {

          // 🔁 FIRST request triggers refresh
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            if (!this.refreshToastShown) {
              this.toasterQueu.showError(
                'Session expired. Refreshing token...',
                'Authentication'
              );
              this.refreshToastShown = true;
            }

            return this.loginService.refreshToken().pipe(
              switchMap((res: AuthResponse) => {
                this.loginService.saveAuthData(res);
                this.refreshTokenSubject.next(res.accessToken);

                this.toasterQueu.showSuccess(
                  'Session restored successfully',
                  'Authentication'
                );

                return next.handle(
                  this.addToken(req, res.accessToken)
                );
              }),

              catchError(err => {
                this.handleLogout();
                return throwError(() => err);
              }),

              finalize(() => {
                this.isRefreshing = false;
                this.refreshToastShown = false;
              })
            );
          }

          // ⏳ OTHER requests wait here
          return this.refreshTokenSubject.pipe(
            filter(token => token !== null),
            take(1),
            switchMap(token =>
              next.handle(this.addToken(req, token!))
            )
          );
        }

        return throwError(() => error);
      })
    );
  }

  // 🔹 Helper methods
  private addToken(req: HttpRequest<any>, token: string) {
    return req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  private handleLogout() {
    this.isRefreshing = false;
    this.refreshTokenSubject.next(null);
    this.loginService.logout();
     this.toasterQueu.showError(
                'Refreshing token as expired. Please log in again.',
                'Authentication'
              );
    this.router.navigate(['/login']);
  }



}
