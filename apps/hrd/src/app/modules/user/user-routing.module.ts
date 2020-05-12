import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingPageComponent } from '@workspace/apps/hrd/src/app/modules/user/user-setting-page/user-setting-page.component';


const routes: Routes = [
  {path: '', component: UserSettingPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
