import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '@workspace/apps/hrd/src/app/modules/auth/auth.component';
import { LoginComponent } from '@workspace/apps/hrd/src/app/modules/auth/login/login.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      {
        path: 'login', component: LoginComponent
      },
      { path: '', pathMatch: 'full', redirectTo: 'login' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
