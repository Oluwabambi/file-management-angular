import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Globals } from 'src/app/_Classes/Globals';
import { UploadModalComponent } from 'src/app/modals/upload-modal/upload-modal.component';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';
import { TokenService } from 'src/app/services/token.service';
import { FilesService } from 'src/app/services/upload/files.service';

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
  reverse: boolean = true;
  itemsPerPage = 25;
  currentPage = 1;
  currentUser: any;
  term = '';
  entriesOptions: any = [
    { id: 1, label: '10', pageItems: 10 },
    { id: 2, label: '15', pageItems: 15 },
    { id: 3, label: '20', pageItems: 20 },
    { id: 4, label: '25', pageItems: 25 },
    { id: 5, label: '30', pageItems: 30 },
  ];
  filterForm = new FormGroup({
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required]),
  });

  constructor(
    private modalService: BsModalService,
    private toastr: NgxToastService,
    private fileService: FilesService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUserRole();
    this.getFiles();
    console.log(this.key);
  }

  getUserRole() {
    this.currentUser = JSON.parse(this.tokenService.getUserDetails());
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
    if (this.currentUser.roles[0] === 'ROLE_ADMIN') {
      this.fileService.allFiles().subscribe({
        next: (res) => {
          this.isLoading = false;
          res.forEach((item: any, index: any) => {
            item.itemIndex = index;
          });
          this.files = res;
          this.entriesOptions.push({
            id: 6,
            label: 'All',
            pageItems: this.files?.length,
          });
        },
      });
    } else {
      this.fileService.allUserFiles().subscribe({
        next: (res) => {
          this.isLoading = false;
          res.forEach((item: any, index: any) => {
            item.itemIndex = index;
          });
          this.files = res;
          this.entriesOptions.push({
            id: 6,
            label: 'All',
            pageItems: this.files?.length,
          });
        },
      });
    }
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
    if (this.key !== key) {
      if (key === 'dateUploaded') {
        this.reverse = true;
      } else {
        this.reverse = false;
      }
    } else {
      this.reverse = !this.reverse;
    }
    this.key = key;
  }

  filterFiles() {
    this.isLoading = true;
    this.files = [];
    this.fileService.getFilesByDate(this.filterForm.value).subscribe({
      next: (res) => {
        res.forEach((item: any, index: any) => {
          item.itemIndex = index;
        });
        this.files = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      }
    })
  }

  isInvalid(data:any) {
    const allInvalid = !data.value.startDate && !data.value.endDate;
    if (allInvalid) {
      return true;
    }
    if (!data.value.startDate && data.value.endDate) {
      return true;
    }
    return false;
  }
}
