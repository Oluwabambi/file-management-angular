import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: [
    './forgot-password.component.css',
    '../auth.component.css',
  ],
})
export class ForgotPasswordComponent implements OnInit {
  isLoading: boolean = false;
  email = new FormControl('', [Validators.required, Validators.email])
  constructor() {}

  ngOnInit(): void {}
}
