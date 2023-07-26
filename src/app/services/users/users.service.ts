import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private api: ApiHandlerService) {}

  createUser(data: any) {
    return this.api.post('', data)
  }
}
