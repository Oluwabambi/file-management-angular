import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiHandlerService) { }

  login(data:any) {
    return this.api.post('login', data)
  }

  logout(data:any) {
    localStorage.removeItem('token');
    return this.api.post('logout', data)
  }

  resetPassword(data: any) {
    return this.api.post('change-password', data);
  }
}
