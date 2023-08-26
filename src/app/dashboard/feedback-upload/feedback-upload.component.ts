import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Globals } from 'src/app/_Classes/Globals';
import { UploadModalComponent } from 'src/app/modals/upload-modal/upload-modal.component';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';
import { TokenService } from 'src/app/services/token.service';
import { FilesService } from 'src/app/services/upload/files.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-feedback-upload',
  templateUrl: './feedback-upload.component.html',
  styleUrls: ['./feedback-upload.component.css', '../dashboard.component.css'],
})
export class FeedbackUploadComponent implements OnInit {
  isLoading: boolean = true;
  toastOpen: boolean = false;
  files: any;
  key: any = 'dateUploaded';
  reverse: boolean = false;
  itemsPerPage = 6;
  currentPage = 1;
  currentUser: any;

  constructor(
    private modalService: BsModalService,
    private toastr: NgxToastService,
    private fileService: FilesService,
    private userService: UsersService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getFiles();
    this.getUserRole()
  }

  getUserRole() {
    this.currentUser = JSON.parse(this.tokenService.getUserDetails());
    
    // this.userService.loggedInUser().subscribe({
    //   next: (res) => {
    //     this.currentUser = res
    //   }
    // })
  }

  openModal() {
    const modalRef: any = this.modalService.show(UploadModalComponent);
    modalRef.content.fileUploaded.subscribe(() => {
      this.getFiles();
    });
    // modalRef.content.onClose.subscribe(() => {
    //   console.log('Modal closed');
    // });
  }
  openToastr() {
    this.toastr.success('File uploaded successfully');
  }

  getFiles() {
    this.isLoading = true;
    this.fileService.allFiles().subscribe({
      next: (res) => {
        this.isLoading = false;
        res.forEach((item: any) => {
          const itemDate = item?.dateUploaded.split('T')[0]
          item.dateUploaded = itemDate
        })
        this.files = res;
      },
    });
  }

  fileDownload(data: any) {
    this.fileService.downloadFile(data.id).subscribe({
      next: (fileInfo: Blob) => {
        console.log(fileInfo);
        const url = window.URL.createObjectURL(fileInfo);
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.download = data.fileName;
        link.click();

        // Clean up the URL object
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
  }

  sort(key: any) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
