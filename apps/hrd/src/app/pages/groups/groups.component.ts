import { Component, OnInit } from '@angular/core';
import { StudentService } from '@services/student.service';

@Component({
  selector: 'hrd-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  sort = '';

  get groups() {
    return this.students.groups.filter(value => {
      return value.group.match(new RegExp(this.sort));
    });
  }

  constructor(public students: StudentService) {}

  ngOnInit() {}
}
