import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { FeedbackUploadComponent } from './feedback-upload/feedback-upload.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { SharedModule } from '../shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgSelectModule } from '@ng-select/ng-select';


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
    Ng2SearchPipeModule,
    NgSelectModule,
    ReactiveFormsModule,
    // TooltipModule
  ],
})
export class DashboardModule { }
