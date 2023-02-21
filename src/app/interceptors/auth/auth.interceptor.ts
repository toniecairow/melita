import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const authToken = this.auth.getAuthorizationToken();
    const authToken = '737633de-d0d1-4aac-832a-29afefdcc47d';

    let authRequest = request.clone({ setHeaders: {
      Authorization: `Bearer${authToken}`,
    }});

    return next.handle(authRequest);
  }
}
