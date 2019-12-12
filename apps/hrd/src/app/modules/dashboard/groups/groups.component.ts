import { Component, OnInit } from '@angular/core';
import { StudentService } from '@services/student.service';
import { map } from '@workspace/node_modules/rxjs/internal/operators';
import { Observable } from '@workspace/node_modules/rxjs';

@Component({
  selector: 'hrd-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
    this.students.setFilterGroups(value);
  }

  private _filter = '';

  groups$: Observable<any>;

  constructor(public students: StudentService) {
  }

  ngOnInit() {
    this.groups$ = this.students.groups$.pipe(map(this.filterFn));
  }

  filterFn(groups) {
    const result = [...groups];
    console.log(result);
    if (result) {
      return result.map(val => {
        if (val.groups) {
          val.groups = val.groups._filter(val2 => {
            return val2.group.match(new RegExp(this._filter));
          });
          return val;
        } else {
          return val.groups;
        }
      });
    } else {
      return result;
    }
  }

}
