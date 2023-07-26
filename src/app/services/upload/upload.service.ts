import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private api: ApiHandlerService) {}

  uploadFile(data:any) {
    return this.api.post('', data)
  }
}
