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

  isLoadingButton: boolean;
  isChangeModalVisible: boolean;
  selectedField: string;


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
  ) {
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

  saveName(name: string) {
    /* this.student.renameGroup(name, this.group.students).subscribe(value => {
       this.renameModalRef.hide();
       this.router.navigate([`/group`, this.route.snapshot.params['year'], name]).then(() => {
         this.refresh();
       });
     });*/
  }

  openModalEdit(name: string) {
    this.selectedField = name;
    this.isChangeModalVisible = true;
  }

  closeModalEdit() {
    this.isChangeModalVisible = false;

  }

  saveModalEdit(field: any) {
    this.isLoadingButton = true;
    const params = {};
    params[this.selectedField] = field.value;
    this.student.editByStudentList(this.group.students, params).subscribe(value => {
      this.isLoadingButton = false;
      this.isChangeModalVisible = false;
      let year = this.route.snapshot.params['year'];
      let group = this.route.snapshot.params['group'];
      if (this.selectedField === 'group_formation_year') {
        year = field.value;
      } else if (this.selectedField === 'group') {
        group = field.value;
      }
      field.value = '';
      this.router.navigate([`/group`, year, group]).then(() => {
        this.refresh();
      });
    });
  }
}
