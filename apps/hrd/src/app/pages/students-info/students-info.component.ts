import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '@services/student.service';
import { NewStudentComponent } from '../new-student/new-student.component';
import { BsModalService } from 'ngx-bootstrap';
import { sudent_fields } from '@configs/student_fields';

@Component({
  selector: 'hrd-students-info',
  templateUrl: './students-info.component.html',
  styleUrls: ['./students-info.component.scss']
})
export class StudentsInfoComponent implements OnInit {
  students_fields = sudent_fields;

  get selectedColumns(): any[] {
    if (!this._selectedColumns) {
      if (localStorage['fields']) {
        this._selectedColumns = JSON.parse(localStorage['fields']);
      } else {
        this._selectedColumns = sudent_fields.filter(val => val.default);
      }
    }
    return this._selectedColumns;
  }

  set selectedColumns(value: any[]) {
    localStorage['fields'] = JSON.stringify(value);
    this._selectedColumns = value;
  }

  selected: any;
  itemsMenu: any;
  @ViewChild('dt1') dtl;
  private _selectedColumns: any[];
  cols: any[];

  get students(): any {
    return this.service.students;
  }

  constructor(
    public service: StudentService,
    private modalService: BsModalService
  ) {
    this.itemsMenu = [
      {
        label: 'Посмотреть',
        icon: 'pi pi-search',
        command: () => this.view(this.selected)
      },
      {
        label: 'Удалить',
        icon: 'pi pi-times',
        command: () => this.delete(this.selected)
      }
    ];
  }

  show() {
    this.modalService.show(NewStudentComponent, { class: 'modal-lg' });
  }
  view(event: any) {
    this.service.view(event._id);
  }

  delete(student) {
    this.service.delete(student._id).subscribe();
  }

  ngOnInit(): void {
    this.cols = sudent_fields;
  }
}
