import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, last } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { TokenService } from '../services/token.service';
import { NgxToastService } from '../services/toasts/ngx-toast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private toastShown: boolean = false;

  constructor(private router: Router, private tokenService: TokenService, private toast: NgxToastService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    if (request.url.includes('/logout')) {
      return next.handle(request);
    }
    
    if (request.url.includes('/login')) {
      return next.handle(request);
    }

    if (!this.toastShown) {

      const isTokenExpired = this.tokenService.isTokenExpired();
  
      if (isTokenExpired) {
        this.toastShown = true;
        this.toast.error('Your session has expired. Please log in again.');
  
        // Redirect the user to the login page
        this.router.navigateByUrl('/auth/login');
  
        return next.handle(request);
      }
  
      const isUserInactive = this.tokenService.isUserInactive();
  
      if (isUserInactive) {
        this.toastShown = true;
        this.toast.error('You have been inactive for too long. Please log in again.');
  
        // Redirect the user to the login page
        this.router.navigateByUrl('/auth/login');
  
        return next.handle(request);
      }
    }


    // // Check if the user has been inactive
    // const inactivityDuration = 30 * 60; // 30 minutes in seconds
    // if (this.userInactiveForMoreThan(inactivityDuration)) {
    //   // Show user inactive alert
    //   this.toast.error('You have been inactive for too long. Please log in again.');
    //   // Redirect the user to the login page
    //   this.router.navigate(['/auth/login']);
    //   return next.handle(request); // You can also return an error or perform additional actions if needed
    // }

    return next.handle(request);
  }

  private userInactiveForMoreThan(durationInSeconds: number): boolean {
    const lastActivityTime = this.getLastActivityTimeFromToken(); // Implement this method to get the last activity time from the token
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return !!lastActivityTime && currentTime - lastActivityTime > durationInSeconds;
  }

  private getLastActivityTimeFromToken(): number {
    // Implement this method to extract the last activity time from the token's payload
    // Assuming you have a method in AuthService to get the token and parse the payload.
    // Modify this based on your token structure.
    const token = this.tokenService.getToken();
    const payload = this.tokenService.parseTokenPayload(JSON.stringify(token));

    let lastActivityTime = this.tokenService.formatLastActivityTime(payload.last_activity)
    lastActivityTime = lastActivityTime / 1000;
    return payload && lastActivityTime ? lastActivityTime : 0;
  }

  
}
