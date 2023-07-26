import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UploadModalComponent } from 'src/app/modals/upload-modal/upload-modal.component';

@Component({
  selector: 'app-feedback-upload',
  templateUrl: './feedback-upload.component.html',
  styleUrls: ['./feedback-upload.component.css', '../dashboard.component.css'],
})
export class FeedbackUploadComponent implements OnInit {
  files: any = [
    {
      id: 1,
      description: 'description 1',
      date_uploaded: '21/05/2023',
      file_size: '2.50MB',
      status: 'Processed',
      user_id: 1,
    },
    {
      id: 2,
      description: 'description 2',
      date_uploaded: '11/11/2023',
      file_size: '23.00MB',
      status: 'Processed',
      user_id: 2,
    },
    {
      id: 3,
      description: 'description 3',
      date_uploaded: '14/12/2023',
      file_size: '10.50MB',
      status: 'Processing',
      user_id: 3,
    },
    {
      id: 4,
      description: 'description 4',
      date_uploaded: '03/07/2023',
      file_size: '22.45MB',
      status: 'Processing',
      user_id: 4,
    },
    {
      id: 5,
      description: 'description 5',
      date_uploaded: '10/05/2023',
      file_size: '9.70MB',
      status: 'Pending',
      user_id: 2,
    },
  ];

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {}

  openModal() {
    const modalRef: any = this.modalService.show(UploadModalComponent);
    // modalRef.content.onClose.subscribe(() => {
    //   console.log('Modal closed');
    // });
  }

  // changeSide(val: any) {
  //   this.sideChanged = val    
  // }
}
