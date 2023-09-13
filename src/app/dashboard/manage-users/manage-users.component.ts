import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddUserModalComponent } from 'src/app/modals/add-user-modal/add-user-modal.component';
import { ConfirmStatusComponent } from 'src/app/modals/confirm-status/confirm-status.component';
import { EditUserModalComponent } from 'src/app/modals/edit-user-modal/edit-user-modal.component';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css', '../dashboard.component.css'],
})
export class ManageUsersComponent implements OnInit {
  isLoading: boolean = true;
  updateLoading: boolean = false;
  users: any;
  userToUpdate: any;
  itemsPerPage = 25;
  currentPage = 1;
  term = '';
  key: any = 'itemIndex';
  reverse: boolean = false;
  entriesOptions: any = [
    { id: 1, label: '10', pageItems: 10 },
    { id: 2, label: '15', pageItems: 15 },
    { id: 3, label: '20', pageItems: 20 },
    { id: 4, label: '25', pageItems: 25 },
    { id: 5, label: '30', pageItems: 30 },
  ];

  constructor(
    private modalService: BsModalService,
    private userService: UsersService,
    private toast: NgxToastService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    if (!this.tokenService.isAdmin()) {
      this.router.navigateByUrl('/feedback-upload');
    }
  }

  openModal() {
    const modalRef: any = this.modalService.show(AddUserModalComponent);
    modalRef.content.userCreated.subscribe({
      next: (res: any) => {
        this.getUsers();
      },
    });
    // modalRef.content.onClose.subscribe(() => {
    //   console.log('Modal closed');
    // });
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.isLoading = false;
        res.forEach((item: any, index: any) => {
          item.itemIndex = index;
          if (!item.lastLogin) {
            item.lastLogin = '-';
          } else {
            const itemLastLogin = item?.lastLogin.split('T')[0];
            item.lastLogin = itemLastLogin;
          }
          const itemDate = item?.dateAdded.split('T')[0];
          item.dateAdded = itemDate;
          return item;
        });
        this.users = res;
        this.entriesOptions.push({ id: 6, label: 'All', pageItems: this.users?.length });
      },
    });
  }

  showEditModal(userDetails: any) {
    const initialState = { userDetails };
    const editModalRef = this.modalService.show(EditUserModalComponent, {
      initialState,
    });
  }

  showConfirmModal(userData: any) {
    const initialState = { userData };
    const confirmModalRef = this.modalService.show(ConfirmStatusComponent, {
      initialState,
    });
    confirmModalRef.content?.statusUpdated.subscribe({
      next: (res: any) => {
        this.getUsers();
      },
    });
  }

  changeUserStatus(user: any) {
    this.userToUpdate = user.id;
    this.updateLoading = true;
    const userStatus: any = {};
    if (user.status === 'active') {
      userStatus['status'] = 'Inactive';
    } else {
      userStatus['status'] = 'Active';
    }
    const uId = +user.id;
    this.userService.updateUser(userStatus, uId).subscribe({
      next: (res) => {
        this.updateLoading = false;
        this.getUsers();
        this.toast.success('User status updated');
      },
      error: (err) => {
        this.updateLoading = false;
        this.toast.error('An error occured');
      },
    });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

  sort(key: any) {
    if (this.key !== key) {
        this.reverse = false;
      } else {
      this.reverse = !this.reverse;
    }
    this.key = key;
  }
}
