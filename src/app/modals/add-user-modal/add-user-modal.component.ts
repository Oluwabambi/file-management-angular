import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css'],
})
export class AddUserModalComponent implements OnInit {
  isLoading: boolean = false;
  passwordShown: boolean = false;
  submitted: boolean = false;
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    userType: new FormControl('', [Validators.required]),
  });

  @Output() userCreated = new EventEmitter<any>();

  constructor(
    public bsModalRef: BsModalRef,
    private userService: UsersService,
    private toast: NgxToastService
  ) {}

  ngOnInit(): void {}

  get firstName() {
    return this.userForm.get('firstName');
  }

  get lastName() {
    return this.userForm.get('lastName');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get userType() {
    return this.userForm.get('userType');
  }

  addUser() {
    // setTimeout(() => {
    //   this.bsModalRef.hide()
    // }, 2000)
    this.isLoading = true;
    this.submitted = true;
    const data = {
      ...this.userForm.value,
      userType: [this.userForm.value.userType],
      status: true,
    };
    this.userService.createUser(data).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.toast.success('User added successfully');
        this.bsModalRef.hide();
        this.userCreated.emit();
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.toast.error('An error occured');
      },
    });
  }
}
