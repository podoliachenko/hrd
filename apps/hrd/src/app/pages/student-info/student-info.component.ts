import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '@services/student.service';
import { ActivatedRoute } from '@angular/router';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';
import { StudentField } from '@interfaces/student-field';
import { FormControl, FormGroup } from '@angular/forms';
import { sudent_fields } from '@configs/student_fields';
import { DictionaryService } from '@services/dictionary.service';

@Component({
  selector: 'hrd-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit, OnDestroy {
  student: any;

  error: string;
  students_fields = sudent_fields;

  statusUserChangeSubs: Subscription;
  paramsSubs: Subscription;
  public modal: boolean;
  public modalField: StudentField;
  formGroupModal: FormGroup;

  constructor(
    public service: StudentService,
    public route: ActivatedRoute,
    private auth: HrdAuthService,
    public dictionaryService: DictionaryService
  ) {
    this.formGroupModal = new FormGroup({});
  }

  ngOnInit() {
    this.statusUserChangeSubs = this.auth.statusUserChange.subscribe(val => {
      if (val && val.status) {
        this.paramsSubs = this.route.params.subscribe(() => {
          // this.dictionaryService.refreshDictionaries();
          this.getStudent();
        });
      } else {
        this.student = null;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statusUserChangeSubs && !this.statusUserChangeSubs.closed) {
      this.statusUserChangeSubs.unsubscribe();
    }
    if (this.paramsSubs && !this.paramsSubs.closed) {
      this.paramsSubs.unsubscribe();
    }
    this.statusUserChangeSubs = null;
    this.paramsSubs = null;
  }

  showModal(field: StudentField) {
    this.modalField = field;
    Object.keys(this.formGroupModal.controls).forEach(value => {
      this.formGroupModal.removeControl(value);
    });
    const val = this.student.student[field.field];
    if (field.type === 'date') {
      this.formGroupModal.addControl(
        field.field,
        new FormControl(new Date(val))
      );
    } else {
      this.formGroupModal.addControl(field.field, new FormControl(val));
    }
    this.modal = true;
  }

  changeField() {
    this.service
      .edit(this.student.student._id, this.formGroupModal.value)
      .subscribe(() => {
        this.getStudent();
      });
  }

  getStudent() {
    this.service.getStudentInfo(this.route.snapshot.params.id).subscribe(
      value2 => {
        delete this.error;
        this.student = value2;
      },
      () => (this.error = 'Студент отсутствует')
    );
  }
}
