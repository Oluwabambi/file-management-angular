import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.tokenService.isLoggedIn()) {
      const accessToken = this.tokenService.getToken();
      if (accessToken) {
        if (request.body instanceof FormData) {
          // if we are sending a FormData , then  we dont need   'Content-Type': 'application/json',
          request = request.clone({
            headers: new HttpHeaders({
              Authorization: 'Bearer ' + accessToken,
            }),
          });
        } else {
          request = request.clone({
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + accessToken,
            }),
          });
        }
      }
    }
    return next.handle(request);
  }
}
