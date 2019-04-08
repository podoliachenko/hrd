import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsInfoComponent } from '@pages/students-info/students-info.component';
import { AuthControllerGuard } from '@guards/auth-controller.guard';
import { UsersComponent } from '@components/users/users.component';
import { GroupsComponent } from '@pages/groups/groups.component';
import { GroupComponent } from '@pages/group/group.component';
import { NewStudentComponent } from '@pages/new-student/new-student.component';
import { StudentInfoComponent } from '@pages/student-info/student-info.component';
import { DictionariesComponent } from '@pages/dictionaries/dictionaries.component';
import { DictionaryComponent } from '@pages/dictionaries/dictionary/dictionary.component';

const routes: Routes = [
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
    path: 'group/:group',
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
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'students',
    canActivate: [AuthControllerGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
