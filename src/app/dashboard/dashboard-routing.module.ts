import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { FeedbackUploadComponent } from './feedback-upload/feedback-upload.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'feedback-upload',
        component: FeedbackUploadComponent,
      },
      {
        path: 'manage-users',
        component: ManageUsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
