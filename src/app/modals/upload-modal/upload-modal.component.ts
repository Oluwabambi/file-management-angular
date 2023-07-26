import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css'],
})
export class UploadModalComponent implements OnInit {
  uploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  get file() { return this.uploadForm.get('file'); }

  get description() { return this.uploadForm.get('description'); }

  fileUpload() {}
}
