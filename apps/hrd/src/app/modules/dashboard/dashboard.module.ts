import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DictionariesComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/dictionaries/dictionaries.component';
import { DictionaryComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/dictionaries/dictionary/dictionary.component';
import { GroupComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/group/group.component';
import { GroupsComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/groups/groups.component';
import { StudentInfoComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/student-info/student-info.component';
import { StudentsInfoComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/students-info/students-info.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToastModule } from '@workspace/node_modules/primeng/components/toast/toast';
import { HrdComponentsModule } from '@components/hrd-components.module';
import { HrdPipesModule } from '@pipes/hrd-pipes.module';
import { NewStudentComponent } from '@workspace/apps/hrd/src/app/modules/dashboard/new-student/new-student.component';

@NgModule({
  declarations: [
    DictionariesComponent,
    DictionaryComponent,
    GroupComponent,
    GroupsComponent,
    StudentInfoComponent,
    StudentsInfoComponent,
    DashboardComponent,
    NewStudentComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToastModule,
    HrdComponentsModule,
    HrdPipesModule
  ],
  entryComponents: [NewStudentComponent]
})
export class DashboardModule {
}
