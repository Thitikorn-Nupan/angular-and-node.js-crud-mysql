import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
export class ErrorIntercept implements HttpInterceptor {
  /* it will show some error when http request was wrong*/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((e : HttpErrorResponse) => {
          let errorMessage : Object ;
          if (e.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = {message : e.message}
          } else {
            errorMessage = {error_status : e.status , message : e.message}
          }
          console.log(errorMessage);
          /*
            {
            error_status: 0,
            message: 'Http failure response for http://localhost:8080/reads: 0 Unknown Error'
            }
          */
          return throwError(() => {
            return errorMessage
          });
        })
      )
  }
}
