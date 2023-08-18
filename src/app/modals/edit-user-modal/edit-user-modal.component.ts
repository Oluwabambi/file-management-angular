import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.css'],
})
export class EditUserModalComponent implements OnInit {
  passwordShown: boolean = false;
  isLoading: boolean = false;
  submitted: boolean = false;
  roleOptions: any;

  selectedUserType: any;
  selectedUserEmail: any;

  @Input() userDetails: any;

  @Output() userUpdate = new EventEmitter<any>();

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private userService: UsersService, private toast: NgxToastService) {}

  ngOnInit(): void {
    this.selectedUserEmail = this.userDetails.email;
    this.selectedUserType = this.userDetails.roleName[0];

    this.getRoles();

  }
  
  getRoles() {
    this.userService.getRoles().subscribe({
      next: (res) => {
        this.roleOptions = res;
        this.roleOptions = this.formatRoles(this.roleOptions);
      }
    })
  }

  isDisabled(): boolean {
    if (!this.selectedUserType?.id || this.selectedUserEmail === '') {
      return true;
    }
    return false;
  }

  getUserType(id:any) {
    this.roleOptions.forEach((item: any) => {
      if (item.id === id) {
        // this.userDetails.userType = item.roleName;
        this.selectedUserType.name = item.roleName.toLowerCase();
      }
    });
  }

  formatRoles(data:any) {
    data.forEach((item: any) => {
      if (item.name === 'ROLE_ADMIN') {
        item['roleName'] = 'Admin';
      } else if (item.name === 'ROLE_USER') {
        item['roleName'] = 'Normal User';
      } else if (item.name === 'ROLE_SUPER_ADMIN') {
        item['roleName'] = 'Super Admin';
      }
    })
    return data;
  }


  editUser() {
    this.isLoading = true;
    this.submitted = true;
    const userId = this.userDetails.id;
    this.getUserType(this.selectedUserType.id)
    const data = {
      userType: [this.selectedUserType.name],
      email: this.selectedUserEmail
    }
    this.userService.updateUser(data, userId).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.bsModalRef.hide();
        this.toast.success('User edited successfully')
        this.submitted = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.toast.success('User edited successfully')
        this.submitted = false;
      },
    });
  }
}
