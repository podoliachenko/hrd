import { Component, OnDestroy, OnInit } from '@angular/core';
import { StudentService } from '@services/student.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DictionaryService } from '@services/dictionary.service';
import { Subscription } from 'rxjs';
import { HrdAuthService } from '@services/hrd-auth.service';

@Component({
  selector: 'hrd-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit, OnDestroy {
  form: FormGroup;
  filterGroup = '';

  statusUserChangeSubs: Subscription;

  process: boolean;

  constructor(
    private service: StudentService,
    private route: Router,
    public dictionary: DictionaryService,
    private auth: HrdAuthService
  ) {
    this.form = new FormGroup({
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      group: new FormControl('', [Validators.required]),
      patronymic: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      inn: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      address2: new FormControl('', [Validators.required]),
      phone_number: new FormControl('', [Validators.required]),
      passport_series: new FormControl(''),
      passport_no: new FormControl('', [Validators.required]),
      form_study: new FormControl(null, [Validators.required]),
      terms_training: new FormControl(null, [Validators.required]),
      status: new FormControl(null, [Validators.required]),
      notes: new FormControl(''),
      specialty: new FormControl(null, [Validators.required])
    });
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
    this.service.addStudent(this.form.value).subscribe(() => {
      this.process = false;
      this.form.reset();
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
    this.service.addStudent(this.form.value).subscribe((value: any) => {
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
