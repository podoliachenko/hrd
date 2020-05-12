import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserSettingPageComponent } from './user-setting-page/user-setting-page.component';
import { NzButtonModule, NzFormModule, NzInputModule } from '@workspace/node_modules/ng-zorro-antd';
import { ReactiveFormsModule } from '@workspace/node_modules/@angular/forms';
import { TranslateModule } from '@workspace/node_modules/@ngx-translate/core';


@NgModule({
  declarations: [UserSettingPageComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
    NzButtonModule,
    TranslateModule
  ]
})
export class UserModule { }
