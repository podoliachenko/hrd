import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrdPrivilegeDirective } from '@workspace/apps/hrd/src/app/directives/hrd-privilege.directive';


@NgModule({
  declarations: [HrdPrivilegeDirective],
  imports: [
    CommonModule
  ],
  exports: [
    HrdPrivilegeDirective
  ]
})
export class DirectivesModule {
}
