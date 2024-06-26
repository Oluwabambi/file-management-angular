import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FeedbackUploadComponent } from 'src/app/dashboard/feedback-upload/feedback-upload.component';
import { NgxToastService } from 'src/app/services/toasts/ngx-toast.service';
import { FilesService } from 'src/app/services/upload/files.service';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css'],
})
export class UploadModalComponent implements OnInit {
  isLoading: boolean = false;
  submitted: boolean = false;
  files: File[] = [];
  rejectedFile: boolean = false;
  paymentGatewayTypes: any[] = [
    {id: 1, name: 'NAPS'}, 
    {id: 2, name: 'NEFT'}
];

  uploadData = new FormData();
  addedFile: any;

  paymentGateway = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);

  @Output() fileUploaded = new EventEmitter<any>();

  constructor(
    public bsModalRef: BsModalRef,
    private toast: NgxToastService,
    private fileService: FilesService
  ) {}

  ngOnInit(): void {}

  // get file() {
  //   return this.uploadForm.get('file');
  // }

  // get description() {
  //   return this.uploadForm.get('description');
  // }

  onSelect(event: any) {
    console.log(event);
    if (event.rejectedFiles.length > 0) {
      this.rejectedFile = true;
    } else {
      this.files.push(...event.addedFiles);
      this.addedFile = event.addedFiles[0];
      this.uploadData.append('file', this.addedFile);
      this.rejectedFile = false;
    }
  }

  fileUpload() {
    this.isLoading = true;
    this.submitted = true;
    const descValue: any = this.description.value;
    const gatewayValue: any = this.paymentGateway.value;
    this.uploadData.append('description', descValue);
    this.uploadData.append('payment_gateway', gatewayValue);
    // this.fileService.uploadFile(this.uploadData).subscribe({
    //   next: (res) => {
    //     this.toast.success('File uploaded successfully');
    //     this.isLoading = false;
    //     this.bsModalRef.hide();
    //     this.fileUploaded.emit();
    //     this.submitted = false;
    //   },
    //   error: (err) => {
    //     // this.toast.success('File uploaded successfully');  // show success message for now
    //     if (err.status !== 200) {
    //       this.toast.success('File uploaded successfully');
    //       this.isLoading = false;
    //       this.submitted = false;
    //       this.bsModalRef.hide();
    //       this.fileUploaded.emit();
    //       return;
    //     }
    //     this.toast.error(err.error.text);
    //     this.isLoading = false;
    //     console.log(err);
    //     this.submitted = false;
    //   },
    // });
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  isDisabled(): boolean {
    if (this.files.length === 0 || this.description.value === '' || this.paymentGateway.value === '') {
      return true;
    }
    return false;
  }
}
