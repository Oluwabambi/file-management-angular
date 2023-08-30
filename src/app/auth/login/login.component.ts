import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../auth.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  submitted: boolean = false;
  passwordShown: boolean = false;
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  currentYear = new Date().getFullYear()

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenService, private toast: NgxToastService) {}

  ngOnInit(): void {}

  get email() { return this.loginForm.get('username') }

  get password() { return this.loginForm.get('password') }

  login() {
    this.isLoading = true
    this.submitted = true;
    this.authService.login(this.loginForm.value).subscribe(
      {
      next: (res) => {
        this.isLoading = false;
        this.submitted = false;
        const token = res.body.token;
        this.tokenService.storeUserDetails(res.body)
        this.tokenService.storeToken(token);
        this.router.navigateByUrl('/feedback-upload');
        
      },
      error: (err) => {
        this.submitted = false;
        this.isLoading = false;
        console.log(err);
        if (err?.error?.message === 'Bad credentials') {
          this.toast.error('Incorrect username or password.')
        }
      }
    }
    )
  }
}
