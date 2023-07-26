import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent implements OnInit {
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    userType: new FormControl('', [Validators.required]),
  });

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  get firstName() { return this.userForm.get('firstName'); }

  get lastName() { return this.userForm.get('lastName'); }

  get email() { return this.userForm.get('email'); }

  get password() { return this.userForm.get('password'); }

  get userType() { return this.userForm.get('userType'); }

  addUser() {
    setTimeout(() => {
      this.bsModalRef.hide()
    }, 2000)
  }
}
