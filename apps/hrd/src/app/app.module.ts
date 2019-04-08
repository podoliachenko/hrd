import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import {
  AutoCompleteModule,
  CalendarModule,
  ContextMenuModule,
  DialogModule,
  DialogService,
  InplaceModule,
  InputTextareaModule,
  InputTextModule,
  MessageService,
  MultiSelectModule,
  PaginatorModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { NewStudentComponent } from '@pages/new-student/new-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StudentInfoComponent } from '@pages/student-info/student-info.component';
import { StudentsInfoComponent } from '@pages/students-info/students-info.component';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule
} from 'angular-6-social-login';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { InterceptorService } from '@services/interceptor.service';
import { UsersComponent } from '@components/users/users.component';
import { StartComponent } from '@components/start/start.component';
import { GroupsComponent } from '@pages/groups/groups.component';
import { GroupComponent } from '@pages/group/group.component';
import { FixColumnsPipe } from '@pipes/fix-colums.pipe';
import { LogPipe } from '@pipes/log.pipe';
import { StaticTableComponent } from '@components/static-table/static-table.component';
import { StringifyPipe } from '@pipes/StringifyPipe.pipe';
import { DictionaryService } from '@services/dictionary.service';
import { DictionariesComponent } from '@pages/dictionaries/dictionaries.component';
import { AppRoutingModule } from './app-routing.module';
import { DictionaryComponent } from '@pages/dictionaries/dictionary/dictionary.component';
import { ToastModule } from 'primeng/toast';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { NxModule } from '@nrwl/nx';

@NgModule({
  declarations: [
    AppComponent,
    NewStudentComponent,
    NewStudentComponent,
    StudentInfoComponent,
    StudentsInfoComponent,
    NavbarComponent,
    UsersComponent,
    StartComponent,
    GroupsComponent,
    GroupComponent,
    FixColumnsPipe,
    LogPipe,
    StaticTableComponent,
    StringifyPipe,
    DictionariesComponent,
    DictionaryComponent,
    DynamicTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    DynamicDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PaginatorModule,
    AppRoutingModule,
    ContextMenuModule,
    CalendarModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SocialLoginModule,
    AutoCompleteModule,
    InputTextareaModule,
    MultiSelectModule,
    DialogModule,
    InplaceModule,
    ToastModule,
    NxModule.forRoot()
  ],
  providers: [
    DialogService,
    DictionaryService,
    MessageService,
    {
      provide: AuthServiceConfig,
      useFactory: () =>
        new AuthServiceConfig([
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '955712266139-p02inm3kua8ugl2mq5clsovi1juhgq0g.apps.googleusercontent.com'
            )
          }
        ])
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [NewStudentComponent]
})
export class AppModule {}
