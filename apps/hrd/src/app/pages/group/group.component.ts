import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '@services/student.service';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';
import { student_fields } from '@configs/student_fields';

@Component({
  selector: 'hrd-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit, OnDestroy {
  group: any;
  cols: any[] = [
    { field: 'index', header: '№', width: '40px' },
    { field: 'last_name', header: 'Фамилия' },
    { field: 'first_name', header: 'Имя' }
  ];
  itemsMenu = [
    {
      label: 'Посмотреть',
      icon: 'pi pi-search',
      command: () => this.view(this.selected)
    }
  ];
  selected: any;
  statusUserChangeSubs: Subscription;
  students_fields = student_fields;

  constructor(
    private route: ActivatedRoute,
    public student: StudentService,
    private auth: HrdAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.statusUserChangeSubs = this.auth.statusUserChange.subscribe(val => {
      if (val && val.status) {
        this.student
          .getGroup(this.route.snapshot.params['group'])
          .subscribe((value: any[]) => {
            this.group = value;
            this.group.students = this.group.students.map((student, index) => {
              student.index = index + 1;
              return student;
            });
          });
      } else {
        this.group = null;
      }
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
}
