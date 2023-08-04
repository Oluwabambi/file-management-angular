import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!!token) {
      return true;
    }
    return false;
  }

  storeToken(token:any) {
    localStorage.setItem('token', token)
  }

  storeUserDetails(user:any) {
    localStorage.setItem('loggedInUser', JSON.stringify(user))
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logut() {
    localStorage.removeItem('token');
  }
}
