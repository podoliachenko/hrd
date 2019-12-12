import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthControllerGuard } from '@guards/auth-controller.guard';

const routes: Routes = [
  {path: '', loadChildren: './modules/dashboard/dashboard.module#DashboardModule'},
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
