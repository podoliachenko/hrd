import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from '@workspace/apps/hrd/src/app/modals/reset-password/reset-password.component';
import {
  NzButtonModule,
  NzFormModule, NzIconModule,
  NzInputModule,
  NzModalModule,
  NzSelectModule
} from '@workspace/node_modules/ng-zorro-antd';
import { ReactiveFormsModule } from '@workspace/node_modules/@angular/forms';
import { TranslateModule } from '@workspace/node_modules/@ngx-translate/core';
import { AddElementDictionaryComponent } from './add-element-dictionary/add-element-dictionary.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { HrdComponentsModule } from '@components/hrd-components.module';


const modals = [
  ResetPasswordComponent,
  AddElementDictionaryComponent,
  AddNewUserComponent,
  AddElementDictionaryComponent
];

@NgModule({
  declarations: [...modals ],
  imports: [
    CommonModule,
    NzModalModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    TranslateModule,
    NzSelectModule,
    NzIconModule
  ],
  exports: [...modals]
})
export class ModalsModule {
}
