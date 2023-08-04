import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NgxToastService {
  private options = {
    timeOut: 3000,
    toastClass: 'ngx-toastr toastr-box'
  }

  constructor(private toastrService: ToastrService) {}

  public success(text: any) {
    return this.toastrService.success('', text, this.options);
  }
  public error(text: any) {
    return this.toastrService.error('', text, this.options);

  }
  public info(text: any) {
    return this.toastrService.info('', text, this.options);

  }
  public warning(text: any) {
    return this.toastrService.warning('', text, this.options);

  }
}
