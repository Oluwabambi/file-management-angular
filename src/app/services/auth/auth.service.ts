import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiHandlerService) { }

  login(data:any) {
    return this.api.post('', data)
  }

  resetPassword(data: any) {
    return this.api.post('', data)
  }
}
