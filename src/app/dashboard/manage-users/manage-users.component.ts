import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddUserModalComponent } from 'src/app/modals/add-user-modal/add-user-modal.component';
import { ConfirmStatusComponent } from 'src/app/modals/confirm-status/confirm-status.component';
import { EditUserModalComponent } from 'src/app/modals/edit-user-modal/edit-user-modal.component';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: [
    './manage-users.component.css',
    '../dashboard.component.css'
  ]
})
export class ManageUsersComponent implements OnInit {
  isLoading: boolean = true;
  updateLoading: boolean = false;
  users: any;
  userToUpdate: any;
  itemsPerPage = 6;
  currentPage = 1;
  // users: any = [
  //   { id: 1, firstName: "firstName 1", lastName: "lastName 1", email: 'email1@gmail.com', date_added: '21/05/2023', lastLogin: '10/09/23', status: 'Active', userType: 'Admin', },
  //   { id: 2, firstName: "firstName 2", lastName: "lastName 2", email: 'email2@gmail.com', date_added: '11/11/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'User', },
  //   { id: 3, firstName: "firstName 3", lastName: "lastName 3", email: 'email3@gmail.com', date_added: '14/12/2023', lastLogin: '10/09/23', status: 'Active', userType: 'User', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  //   { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
  // ]

  constructor(private modalService: BsModalService, private userService: UsersService, private toast: NgxToastService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  openModal() {
    const modalRef: any = this.modalService.show(AddUserModalComponent);
    modalRef.content.userCreated.subscribe({
      next: (res: any) => {
        this.getUsers();
      }
    })
    // modalRef.content.onClose.subscribe(() => {
    //   console.log('Modal closed');
    // });
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        res.forEach((item:any) => {
          this.isLoading = false;
          if (!item.lastLogin) {
            item.lastLogin = '-'
          } else {
            const itemLastLogin = item?.lastLogin.split('T')[0]
            item.lastLogin = itemLastLogin
          }
          const itemDate = item?.dateAdded.split('T')[0]
          item.dateAdded = itemDate
          return item
        })
        this.users = res;
      }
    })
  }

  showEditModal(userDetails: any) {
    const initialState = { userDetails }
    const editModalRef = this.modalService.show(EditUserModalComponent, { initialState });
  }

  showConfirmModal(userData: any) {
    const initialState = { userData };
    const confirmModalRef = this.modalService.show(ConfirmStatusComponent, { initialState })
    confirmModalRef.content?.statusUpdated.subscribe({
      next: (res: any) => {
        console.log(res);
        this.getUsers();
      }
    })
  }

  changeUserStatus(user:any) {
    this.userToUpdate = user.id
    this.updateLoading = true
    console.log(user);
    const userStatus: any = {}
    if (user.status === 'active') {
      userStatus['status'] = 'Inactive'
    } else {
      userStatus['status'] = 'Active';
    }
    const uId = +user.id
    this.userService.updateUser(userStatus, uId).subscribe({
      next: (res) => {
        this.updateLoading = false;
        this.getUsers();
        this.toast.success('User status updated')
      },
      error: (err) => {
        this.updateLoading = false;
        this.toast.error('An error occured')
      }
    })
  }

  pageChanged(event: any) {
    this.currentPage = event.page
  }

}
