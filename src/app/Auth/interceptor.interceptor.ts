import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor(private _router: Router, private _toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    let authReq = request;
    if (token) {
      authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.clear();
          this._router.navigate(['/login']);
          this.ErrortoastMessage('Unauthorised');
        } else if (error.status === 404) {
          this.ErrortoastMessage('Data Not Found');
        } else {
          this.ErrortoastMessage('Something went wrong please try again');
        }
        return throwError(() => error);
      })
    );
  }

  ErrortoastMessage(msg: string) {
    this._toastr.error(msg);
  }
}
