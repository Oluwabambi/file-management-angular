import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UploadModalComponent } from 'src/app/modals/upload-modal/upload-modal.component';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';
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
  itemsPerPage = 6;
  currentPage = 1;
  // files: any = [
  //   {
  //     id: 1,
  //     description: 'description 1',
  //     date_uploaded: '21/05/2023',
  //     file_size: '2.50MB',
  //     status: 'Processed',
  //     user_id: 1,
  //   },
  //   {
  //     id: 2,
  //     description: 'description 2',
  //     date_uploaded: '11/11/2023',
  //     file_size: '23.00MB',
  //     status: 'Processed',
  //     user_id: 2,
  //   },
  //   {
  //     id: 3,
  //     description: 'description 3',
  //     date_uploaded: '14/12/2023',
  //     file_size: '10.50MB',
  //     status: 'Processing',
  //     user_id: 3,
  //   },
  //   {
  //     id: 4,
  //     description: 'description 4',
  //     date_uploaded: '03/07/2023',
  //     file_size: '22.45MB',
  //     status: 'Processing',
  //     user_id: 4,
  //   },
  //   {
  //     id: 5,
  //     description: 'description 5',
  //     date_uploaded: '10/05/2023',
  //     file_size: '9.70MB',
  //     status: 'Pending',
  //     user_id: 2,
  //   },
  // ];

  constructor(
    private modalService: BsModalService,
    private toastr: NgxToastService,
    private testi: UsersService,
    private fileService: FilesService
  ) {}

  ngOnInit(): void {
    this.getFiles();
    let headers = new HttpHeaders();
    console.log(headers);
    console.log(localStorage.getItem('cookie'));
    this.testi.getUsers().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
        console.log(res);
        this.isLoading = false;
        this.files = res;
      },
    });
  }

  fileDownload(data: any) {
    this.fileService.downloadFile(data.id).subscribe({
      next: (fileInfo: Blob) => {
        console.log(fileInfo);
        const url = window.URL.createObjectURL(fileInfo);
        console.log(url);
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
    this.currentPage = event.page
  }

  // changeSide(val: any) {
  //   this.sideChanged = val
  // }
}
