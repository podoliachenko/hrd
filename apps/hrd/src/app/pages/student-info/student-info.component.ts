import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '@services/student.service';
import { ActivatedRoute } from '@angular/router';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';
import { StudentField } from '@interfaces/student-field';
import { FormControl, FormGroup } from '@angular/forms';
import { student_fields, student_schematic } from '@configs/student_fields';
import { DictionaryService } from '@services/dictionary.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { AllFieldsComponent } from '@components/all-fields/all-fields.component';

@Component({
  selector: 'hrd-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss']
})
export class StudentInfoComponent implements OnInit, OnDestroy {
  student: any;

  error: string;
  students_fields = student_fields;
  students_schematic = student_schematic;

  statusUserChangeSubs: Subscription;
  paramsSubs: Subscription;
  public modalRef: BsModalRef;
  public modalField: StudentField;
  formGroupModal: FormGroup;
  isChangeModalVisible: boolean;
  isLoadingButton: boolean;

  @ViewChild('allFieldsComponent') allFieldsComponent: AllFieldsComponent;
  studentInfo: any;

  constructor(
    public service: StudentService,
    public route: ActivatedRoute,
    private auth: HrdAuthService,
    public dictionaryService: DictionaryService,
    private modalService: BsModalService
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

  changeField(fields) {
    if (JSON.stringify(this.studentInfo) !== JSON.stringify(fields)) {
      this.isLoadingButton = true;
      this.service
        .edit(this.student.student._id, fields)
        .subscribe(() => {
          this.getStudent();
          this.isLoadingButton = false;
        });
    }
  }

  getStudent() {
    this.service.getStudentInfo(this.route.snapshot.params.id).subscribe(
      (value2: any) => {
        delete this.error;
        const si = {};
        this.students_fields.forEach(value => {
          if (value2.student[value.field] === undefined) {
            si[value.field] = null;
          } else {
            si[value.field] = value2.student[value.field];
          }
        });
        console.log(this.studentInfo);
        this.studentInfo = si;
        this.student = value2;
      },
      () => (this.error = 'Студент отсутствует')
    );
  }
}
