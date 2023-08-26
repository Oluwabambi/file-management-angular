import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../auth.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isLoading: boolean = false;
  submitted: boolean = false;

  passwordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confrimNewPassword: new FormControl('', [Validators.required]),
  })

  constructor(private authService: AuthService, private toast: NgxToastService, private router: Router) { }

  ngOnInit(): void {
  }

  get oldPassword() { return this.passwordForm.get('oldPassword') }

  get newPassword() { return this.passwordForm.get('newPassword') }

  get confirmNewPassword() { return this.passwordForm.get('confirmNewPassword') }

  onSubmit() {
    this.isLoading = true;
    this.submitted = true;

    this.authService.resetPassword(this.passwordForm.value).subscribe({
      next: (res) => {
        this.toast.success(res.body);
        setTimeout(()=> {
          this.router.navigateByUrl('/feedback-upload')
        }, 2000)
      }
    })

  }

}
