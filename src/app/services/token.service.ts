import { Injectable } from '@angular/core';
import { NgxToastService } from './toasts/ngx-toast.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  constructor() {}

  public user(): any {
    const loggedInUser = this.getUserDetails();

    if (!loggedInUser) {
      return {
        id: "",
        firstName: "",
        email: "",
        lastName: "",
        lastLogin: "",
        status: false,
        roles: []
      }
    } else {
      return JSON.parse(loggedInUser);
    }
    
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!!token) {
      return true;
    }
    return false;
  }

  public storeToken(token: any) {
    localStorage.setItem('token', token);
  }

  public storeUserDetails(user: any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public getUserDetails() {
    const loggedInUser: any = localStorage.getItem('loggedInUser') 
    return loggedInUser;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) {
      return true; // No token found, consider it expired
    }

    const tokenPayload = this.parseTokenPayload(token);
    if (!tokenPayload || !tokenPayload.exp) {
      return true; // Invalid token payload or no expiration time found
    }

    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (currentTime >= parseInt(tokenPayload.exp, 10)) {
      return true; // Token expired
    }
    
    return false; // Token not expired
  }

  public isUserInactive(): boolean {
    const token = this.getToken();
    const tokenPayload = this.parseTokenPayload(JSON.stringify(token));
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    const inactivityDuration = 30 * 60; // 30 minutes in seconds
    let lastActivity = this.formatLastActivityTime(tokenPayload.last_activity) / 1000;
    
    if (lastActivity && currentTime - lastActivity > inactivityDuration) {
      return true; // User inactive for 30 minutes, consider it expired
    }

    return false;

  }

  public parseTokenPayload(token: string): any {
    const splitToken = token.split('.');
    if (splitToken.length !== 3) {
      return null; // Invalid token structure
    }

    const payloadBase64 = splitToken[1];
    const payloadJson = atob(payloadBase64);

    try {
      return JSON.parse(payloadJson);
    } catch (error) {
      return null; // Unable to parse token payload
    }
  }

  public formatLastActivityTime(lastActDate: any) {
    let splitDate = lastActDate.split(' ')[0]
    splitDate = splitDate.split('-').reverse().join('-');
    let lastActTime = lastActDate.split(' ')[1]

    lastActDate = splitDate + 'T' + lastActTime;
    lastActDate = Date.parse(lastActDate)
    return lastActDate;
  }

  public logut() {
    localStorage.removeItem('token');
  }
}
