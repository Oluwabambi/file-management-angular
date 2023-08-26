import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-confirm-status',
  templateUrl: './confirm-status.component.html',
  styleUrls: ['./confirm-status.component.css']
})
export class ConfirmStatusComponent implements OnInit {
  updateLoading: boolean = false;
  submitted: boolean = false;

  @Input() userData: any;

  @Output() statusUpdated = new EventEmitter<any>()

  constructor(public bsModalRef: BsModalRef, private userService: UsersService, private toast: NgxToastService) { }

  ngOnInit(): void {
  }

  changeUserStatus(user: any) {
    this.updateLoading = true;
    this.submitted = true;
    const uId = +user.id
    const userStatus: any = { userId: uId }
    if (user.status) {
      userStatus['status'] = 'false'
    } else {
      userStatus['status'] = 'true';
    }
    this.userService.updateUserStatus(userStatus.status, uId).subscribe({
      next: (res) => {
        this.updateLoading = false;
        this.submitted = false;
        // this.getUsers();
        this.bsModalRef.hide();
        this.statusUpdated.emit();
        this.submitted = false;
        this.toast.success('User status updated');
      },
      error: (err) => {
        this.updateLoading = false;
        if (err.status === 200) {
          this.toast.success('User status updated');
          this.bsModalRef.hide();
          this.statusUpdated.emit();
        } else {
          this.toast.error('An error occured')
        }
        this.submitted = false;
      }
    })
  }

}
