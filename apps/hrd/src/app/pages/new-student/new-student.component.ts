import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StudentService } from '@services/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DictionaryService } from '@services/dictionary.service';
import { Subscription } from 'rxjs';
import { HrdAuthService } from '@services/hrd-auth.service';
import { student_fields, student_schematic } from '@configs/student_fields';
import { AllFieldsComponent } from '@components/all-fields/all-fields.component';

@Component({
  selector: 'hrd-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit, OnDestroy {
  filterGroup = '';

  statusUserChangeSubs: Subscription;
  students_fields = student_fields;
  students_schematic = student_schematic;
  process: boolean;

  @ViewChild('allFields') allFields: AllFieldsComponent;

  constructor(
    private service: StudentService,
    private route: Router,
    public dictionary: DictionaryService,
    private auth: HrdAuthService
  ) {

  }

  ngOnInit() {
    this.statusUserChangeSubs = this.auth.statusUserChange.subscribe(val => {
      if (val && val.status) {
        // this.dictionary.refreshDictionaries();
      }
    });
  }

  save() {
    this.process = true;
    this.service.addStudent(this.allFields.formGroup).subscribe(() => {
      this.process = false;
      this.allFields.formGroup.reset();
    });
  }

  getGroups() {
    if (this.service.groups) {
      return this.service.groups
        .filter(value => {
          return value.group.match(new RegExp(this.filterGroup));
        })
        .map((value: any) => {
          return value.group;
        });
    } else {
      return [];
    }
  }

  search(ev) {
    this.filterGroup = ev.query;
  }

  saveAndOpen() {
    this.process = true;
    this.service.addStudent(this.allFields.formGroup.value).subscribe((value: any) => {
      this.process = false;
      this.route.navigate(['/', 'student', value[0]._id]);
    });
  }

  ngOnDestroy(): void {
    if (this.statusUserChangeSubs && !this.statusUserChangeSubs.closed) {
      this.statusUserChangeSubs.unsubscribe();
    }
    this.statusUserChangeSubs = null;
  }
}
