import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HrdAuthService } from './hrd-auth.service';
import { BehaviorSubject, Observable, Subscription, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { DynamicTableService } from '@interfaces/table-service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class StudentService implements OnDestroy, DynamicTableService {
  constructor(
    private http: HttpClient,
    private auth: HrdAuthService,
    private router: Router
  ) {
    this.$items = new BehaviorSubject(null);
    this.userStatusSubs = this.auth.statusUserChange.subscribe(value => {
      if (value && value.status) {
        this.get(1);
        this.getGroups();
      } else {
        delete this.students;
      }
    });
  }

  students: any = {};
  groups: any[];
  pageStudents = 1;
  private filters = {};
  private sort = { _id: 1 };

  private userStatusSubs: Subscription;

  $items: BehaviorSubject<any>;

  addStudent(any) {
    return this.http.post('/student', any).pipe(
      map((value: any[]) => {
        this.get(1);
        this.getGroups();
        return value;
      })
    );
  }

  get(number: number, filters = this.filters, sort = this.sort) {
    this.pageStudents = number;
    const params: any = {};
    params.filter = JSON.stringify(filters);
    params.sort = JSON.stringify(sort);
    this.http
      .get('/student/page/' + this.pageStudents, { params: params })
      .subscribe(value => {
        this.students = {};
        this.students = value;
        this.$items.next(value);
      });
  }

  getGroups() {
    this.http.get('/groups').subscribe((value: any[]) => {
      this.groups = value;
      console.log(value);
    });
  }

  setFilter(name: string, value: string) {
    if (typeof value === 'string') {
      if (value.trim() === '') {
        delete this.filters[name];
      } else {
        this.filters[name] = value;
      }
    } else if (typeof value === 'number') {
      if (isNullOrUndefined(value)) {
        delete this.filters[name];
      } else {
        this.filters[name] = value;
      }
    }
    this.pageStudents = 1;
    this.get(this.pageStudents, this.filters, this.sort);
  }

  setSort(sort) {
    this.sort = sort;
    this.get(this.pageStudents, this.filters, this.sort);
  }

  delete(id): Observable<any> {
    return this.http.delete('/student/' + id).pipe(
      tap(() => {
        this.get(this.pageStudents);
      })
    );
  }

  getStudentInfo(id: string) {
    return this.http.get('/student/' + id);
  }

  ngOnDestroy(): void {
    if (this.userStatusSubs && !this.userStatusSubs.closed) {
      this.userStatusSubs.unsubscribe();
    }
    this.userStatusSubs = null;
    this.$items.complete();
  }

  getGroup(name: string) {
    return this.http.get('/groups/' + name);
  }

  view(_id) {
    this.router.navigate(['student', _id]);
  }

  edit(id, value) {
    return this.http.patch('/student/' + id, value);
  }

  renameGroup(name: string, students: any) {
    const obs = students.map(val => {
      return this.edit(val._id, { group: name });
    });
    return zip(...obs);
  }
}
