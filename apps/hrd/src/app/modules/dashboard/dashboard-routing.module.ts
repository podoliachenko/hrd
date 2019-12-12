import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthControllerGuard } from '@guards/auth-controller.guard';
import { StudentsInfoComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/students-info/students-info.component';
import { UsersComponent } from '@components/users/users.component';
import { GroupsComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/groups/groups.component';
import { GroupComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/group/group.component';
import { NewStudentComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/new-student/new-student.component';
import { StudentInfoComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/student-info/student-info.component';
import { DictionariesComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/dictionaries/dictionaries.component';
import { DictionaryComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/dictionaries/dictionary/dictionary.component';
import { DashboardComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      {
        path: 'students',
        component: StudentsInfoComponent,
        canActivate: [AuthControllerGuard]
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [AuthControllerGuard]
      },
      {
        path: 'groups',
        component: GroupsComponent,
        canActivate: [AuthControllerGuard]
      },
      {
        path: 'group/:year/:group',
        component: GroupComponent,
        canActivate: [AuthControllerGuard]
      },
      {
        path: 'add-student',
        component: NewStudentComponent,
        canActivate: [AuthControllerGuard]
      },
      {
        path: 'student/:id',
        component: StudentInfoComponent,
        canActivate: [AuthControllerGuard]
      },
      {
        path: 'student',
        redirectTo: '',
        pathMatch: 'full',
        canActivate: [AuthControllerGuard]
      },
      {
        path: 'dictionaries',
        component: DictionariesComponent,
        canActivate: [AuthControllerGuard],
        children: [
          {
            path: ':dictionary',
            component: DictionaryComponent,
            canActivate: [AuthControllerGuard]
          }
        ]
      },
      { path: '', pathMatch: 'full', redirectTo: 'students' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
