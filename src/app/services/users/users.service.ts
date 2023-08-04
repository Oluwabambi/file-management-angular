import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private api: ApiHandlerService) {}

  createUser(data: any) {
    return this.api.post('sign-up', data);
  }

  getUsers() {
    return this.api.get('all-users');
  }

  loggedInUser() {
    return this.api.get('loggedIn-user');
  }

  updateUser(data: any, id: any) {
    return this.api.put(`update-user/${id}`, data);
  }

  updateUserStatus(data: any, id: any) {
    return this.api.put(`users/${id}/status`, data);
  }

  getRoles() {
    return this.api.get('all-roles');
  }
}
