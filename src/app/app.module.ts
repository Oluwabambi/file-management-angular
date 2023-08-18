import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadModalComponent } from './modals/upload-modal/upload-modal.component';
import { AddUserModalComponent } from './modals/add-user-modal/add-user-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal'
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { EditUserModalComponent } from './modals/edit-user-modal/edit-user-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmStatusComponent } from './modals/confirm-status/confirm-status.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    UploadModalComponent,
    AddUserModalComponent,
    EditUserModalComponent,
    ConfirmStatusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(),
    NgxDropzoneModule,
    PaginationModule.forRoot(),
    NgSelectModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
