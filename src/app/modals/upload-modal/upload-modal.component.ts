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

  uploadData = new FormData();
  addedFile: any;

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
      console.log(this.addedFile);
      this.rejectedFile = false;
    }
  }

  fileUpload() {
    this.isLoading = true;
    this.submitted = true;
    const descValue: any = this.description.value;
    this.uploadData.append('description', descValue);
    console.log(this.uploadData);

    this.fileService.uploadFile(this.uploadData).subscribe({
      next: (res) => {
        console.log(res);
        // this.toast.success('File uploaded successfully');
        this.isLoading = false;
        this.bsModalRef.hide();
        this.fileUploaded.emit();
        this.submitted = false;

      },
      error: (err) => {
        // this.toast.success('File uploaded successfully');  // show success message for now
        this.toast.error(err.error.text);
        this.isLoading = false;
        console.log(err);
        this.submitted = false;
      },
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  isDisabled(): boolean {
    if (this.files.length === 0 || this.description.value === '') {
      return true;
    }
    return false;
  }
}
