import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const tokenData = localStorage.getItem("tokenData");
    if (!tokenData) {
      return next.handle(request);
    }

    let authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${
          JSON.parse(tokenData || JSON.stringify({}))?.authToken || null
        }`,
      },
    });

    return next.handle(authRequest);
  }
}
