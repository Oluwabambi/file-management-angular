import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AddUserModalComponent } from 'src/app/modals/add-user-modal/add-user-modal.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: [
    './manage-users.component.css',
    '../dashboard.component.css'
  ]
})
export class ManageUsersComponent implements OnInit {

  users: any = [
    { id: 1, firstName: "firstName 1", lastName: "lastName 1", email: 'email1@gmail.com', date_added: '21/05/2023', lastLogin: '10/09/23', status: 'Active', userType: 'Admin', },
    { id: 2, firstName: "firstName 2", lastName: "lastName 2", email: 'email2@gmail.com', date_added: '11/11/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'User', },
    { id: 3, firstName: "firstName 3", lastName: "lastName 3", email: 'email3@gmail.com', date_added: '14/12/2023', lastLogin: '10/09/23', status: 'Active', userType: 'User', },
    { id: 4, firstName: "firstName 4", lastName: "lastName 4", email: 'email4@gmail.com', date_added: '03/07/2023', lastLogin: '10/09/23', status: 'Inactive', userType: 'Admin', },
    { id: 5, firstName: "firstName 5", lastName: "lastName 5", email: 'email5@gmail.com', date_added: '10/05/2023', lastLogin: '10/09/23', status: 'Active', userType: 'Admin', },
  ]

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal() {
    const modalRef: any = this.modalService.show(AddUserModalComponent);
    // modalRef.content.onClose.subscribe(() => {
    //   console.log('Modal closed');
    // });
  }

}
