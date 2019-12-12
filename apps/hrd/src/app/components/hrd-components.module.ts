import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllFieldsComponent } from '@components/all-fields/all-fields.component';
import { DictionaryLogsComponent } from '@components/dictionary-logs/dictionary-logs.component';
import { DynamicTableComponent } from '@components/dynamic-table/dynamic-table.component';
import { NavbarComponent } from '@components/navbar/navbar.component';
import { StaticTableComponent } from '@components/static-table/static-table.component';
import { StudentLogsComponent } from '@components/student-logs/student-logs.component';
import { UniversalFieldComponent } from '@components/universal-field/universal-field.component';
import { UsersComponent } from '@components/users/users.component';
import { NgZorroAntdModule } from '@workspace/node_modules/ng-zorro-antd';
import { TranslateModule } from '@workspace/node_modules/@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@workspace/node_modules/@angular/forms';
import { TableModule } from '@workspace/node_modules/primeng/components/table/table';
import { PanelModule } from '@workspace/node_modules/primeng/components/panel/panel';
import { PaginatorModule } from '@workspace/node_modules/primeng/components/paginator/paginator';
import { MultiSelectModule } from '@workspace/node_modules/primeng/components/multiselect/multiselect';
import { InputTextModule } from '@workspace/node_modules/primeng/components/inputtext/inputtext';
import { InputTextareaModule } from '@workspace/node_modules/primeng/components/inputtextarea/inputtextarea';
import { InplaceModule } from '@workspace/node_modules/primeng/components/inplace/inplace';
import { FieldsetModule } from '@workspace/node_modules/primeng/components/fieldset/fieldset';
import { DialogModule } from '@workspace/node_modules/primeng/components/dialog/dialog';
import { ContextMenuModule } from '@workspace/node_modules/primeng/components/contextmenu/contextmenu';
import { CalendarModule } from '@workspace/node_modules/primeng/components/calendar/calendar';
import { AutoCompleteModule } from '@workspace/node_modules/primeng/components/autocomplete/autocomplete';
import { HrdPipesModule } from '@pipes/hrd-pipes.module';


const components = [AllFieldsComponent,
  DictionaryLogsComponent,
  DynamicTableComponent,
  NavbarComponent,
  DynamicTableComponent,
  StaticTableComponent,
  StudentLogsComponent,
  UniversalFieldComponent,
  UsersComponent];

@NgModule({
  declarations: components,
  exports: [...components,
    NgZorroAntdModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    ContextMenuModule,
    DialogModule,
    FieldsetModule,
    InplaceModule,
    InputTextareaModule,
    InputTextModule,
    MultiSelectModule,
    PaginatorModule,
    PanelModule],
  imports: [
    NgZorroAntdModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    AutoCompleteModule,
    CalendarModule,
    ContextMenuModule,
    DialogModule,
    FieldsetModule,
    InplaceModule,
    InputTextareaModule,
    InputTextModule,
    MultiSelectModule,
    PaginatorModule, PanelModule,
    HrdPipesModule, CommonModule
  ]
})
export class HrdComponentsModule {
}
