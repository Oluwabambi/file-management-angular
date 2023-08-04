import { Injectable } from '@angular/core';
import { ApiHandlerService } from '../api-handler.service';

@Injectable({
  providedIn: 'root',
})
export class FilesService {
  constructor(private api: ApiHandlerService) {}

  uploadFile(data:any) {
    return this.api.post('upload-file', data);
  }

  allFiles() {
    return this.api.get('all-files')
  }

  downloadFile(id:any) {
    return this.api.downloadFile(`download-file/${id}`)
  }
}
