import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule, ModalModule } from 'ngx-bootstrap';
import { InterceptorService } from '@services/interceptor.service';
import { DictionaryService } from '@services/dictionary.service';
import { AppRoutingModule } from './app-routing.module';
import { ToastModule } from 'primeng/toast';
import { NxModule } from '@nrwl/angular';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NZ_I18N, uk_UA } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import uk from '@angular/common/locales/uk';
import ru from '@angular/common/locales/ru';
import { ScrollingModule } from '@workspace/node_modules/@angular/cdk/scrolling';
import { DialogService } from '@workspace/node_modules/primeng/components/dynamicdialog/dialogservice';
import { MessageService } from '@workspace/node_modules/primeng/components/common/messageservice';
import { DirectivesModule } from '@workspace/apps/hrd/src/app/directives/directives.module';

registerLocaleData(ru);
registerLocaleData(uk);

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    DynamicDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastModule,
    NxModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ScrollingModule,
    ModalModule,
    DirectivesModule
  ],
  providers: [
    DialogService,
    DictionaryService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    { provide: NZ_I18N, useValue: uk_UA }
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule {
}
