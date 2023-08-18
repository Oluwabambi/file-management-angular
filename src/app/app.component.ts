import { Component } from '@angular/core';
import { TokenService } from './services/token.service';
import { NgxToastService } from './services/toasts/ngx-toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'css-feedback-upload-frontend';

  constructor( private tokenService: TokenService, private toast: NgxToastService ) {}

  ngOnInit(): void {
    // this.checkTokenExpiry()
  }

  checkTokenExpiry() {
    // if(this.tokenService.isTokenExpired()) {
    //   // this.toast.error('Your token has expired. Please login again.')
    //   return;
    // }

    if (this.tokenService.isUserInactive()) {
      console.log('response innit');
      
      // this.toast.error('You have been inactive for too long. Please login again.');
      return;
    }
  }
}
