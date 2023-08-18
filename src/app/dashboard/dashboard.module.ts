import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FeedbackUploadComponent } from './feedback-upload/feedback-upload.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';


@NgModule({
  declarations: [
    FeedbackUploadComponent,
    ManageUsersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PaginationModule,
    NgxPaginationModule,
    FormsModule,
    OrderModule,
    // TooltipModule
  ],
})
export class DashboardModule { }
