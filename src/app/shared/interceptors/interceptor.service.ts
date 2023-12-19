import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  /** inject the token in all the http request and hadle any error */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const requestToken = this.authService.getToken();
    if (requestToken) {
      request = request.clone({
        headers: request.headers.set('authorization', `Bearer ${requestToken}`),
      });
    }

    /** returing the request and handling errors */
    return next.handle(request).pipe(
      catchError((httpError: any) => {
        if (httpError instanceof HttpErrorResponse) {
          /** printing the error in the console */
          console.error(httpError.error);

          switch (httpError.status) {
            case 401: {
              // this.toastr.error('error', this.translate.instant('ERRORS.401'));

              this.authService.deleteToken();
              this.router.navigate(['login']);
              break;
            }
          }
        }
        return throwError(() => httpError);
      })
    );
  }
}

export const INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true,
};
