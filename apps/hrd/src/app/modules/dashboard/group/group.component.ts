import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '@services/student.service';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';
import { student_fields } from '@configs/student_fields';
import { ExportService } from '@services/export.service';
import { StudentField } from '@interfaces/student-field';
import { FormControl } from '@workspace/node_modules/@angular/forms';

@Component({
  selector: 'hrd-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {

  isLoadingButton: boolean;
  isChangeModalVisible: boolean;
  selectedField: StudentField;
  selectedFormControl: FormControl;

  student_fields;
  group_field;

  group: any;
  selected: any;
  statusUserChangeSubs: Subscription;
  students_fields = student_fields;

  constructor(
    private route: ActivatedRoute,
    public student: StudentService,
    private auth: HrdAuthService,
    private router: Router,
    private exportService: ExportService
  ) {
    this.student_fields = student_fields.filter(v => ['group_formation_year', 'date_of_enrollment', 'enrollment_order',
      'date_of_graduation', 'graduation_order', 'department'].some(v2 => v2 === v.field));
    this.group_field = student_fields.find(v => v.field === 'group');
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.student
      .getGroup(this.route.snapshot.params['year'], this.route.snapshot.params['group'])
      .subscribe((value: any[]) => {
        this.group = value;
        this.group.students = this.group.students.map((student, index) => {
          student.index = index + 1;
          return student;
        });
      });
  }

  ngOnDestroy(): void {
    if (this.statusUserChangeSubs && !this.statusUserChangeSubs.closed) {
      this.statusUserChangeSubs.unsubscribe();
    }
    this.statusUserChangeSubs = null;
  }

  view(event: any) {
    this.router.navigate(['student', event._id]);
  }

  delete(student) {
    this.student.delete(student._id);
  }

  openModalEdit(filed: StudentField) {
    this.selectedField = filed;
    this.selectedFormControl = new FormControl('', filed.validators);
    this.isChangeModalVisible = true;
  }

  closeModalEdit() {
    this.isChangeModalVisible = false;

  }

  saveModalEdit() {
    this.isLoadingButton = true;
    const params = {};
    params[this.selectedField.field] = this.selectedFormControl.value;
    this.student.editByStudentList(this.group.students, params).subscribe(value => {
      this.isLoadingButton = false;
      this.isChangeModalVisible = false;
      let year = this.route.snapshot.params['year'];
      let group = this.route.snapshot.params['group'];
      if (this.selectedField.field === 'group_formation_year') {
        year = this.selectedFormControl.value;
      } else if (this.selectedField.field === 'group') {
        group = this.selectedFormControl.value;
      }
      this.router.navigate([`/group`, year, group]).then(() => {
        this.refresh();
      });
    });
  }

  exportGroupList() {
    const year = this.route.snapshot.params['year'];
    const group = this.route.snapshot.params['group'];
    this.exportService.exportGroupList(year, group);
  }
}
