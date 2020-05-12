import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '@services/users.service';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';
import { User } from '@workspace/apps/api/src/schemas/user.schema';
import { AddNewUserComponent } from '@workspace/apps/hrd/src/app/modals/add-new-user/add-new-user.component';
import { NzMessageService } from '@workspace/node_modules/ng-zorro-antd';

@Component({
  selector: 'hrd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  @ViewChild(AddNewUserComponent, { static: true }) newUserModal: AddNewUserComponent;

  // TODO: вынести в отдельный файл
  private usersLvl = [
    'USERS.LVL.GUEST',
    'USERS.LVL.USER',
    'USERS.LVL.ADMIN',
    'USERS.LVL.SUPERVISOR',
    'USERS.LVL.DEV'
  ];
  users: User[];

  statusUserSubs: Subscription;

  constructor(private service: UsersService, private auth: HrdAuthService,
              private message: NzMessageService) {
  }

  ngOnInit() {
    this.refresh();

  }

  refresh() {
    this.service.getUsers().subscribe((value2: any[]) => {
      this.users = value2;
    });
  }

  ngOnDestroy(): void {
    if (this.statusUserSubs && !this.statusUserSubs.closed) {
      this.statusUserSubs.unsubscribe();
    }
    this.statusUserSubs = null;
  }

  changeLevel(lvl, index: number) {
    const oldLvl = this.users[index].privilege;
    if (lvl !== this.users[index]) {
      this.service.changeLvl(lvl, this.users[index]._id).subscribe(
        (value: any) => {
          if (value.ok) {
            this.users[index].privilege = lvl;
          }
        },
        () => {
          this.users[index].privilege = oldLvl;
        }
      );
    }
  }

  getStringLvl(lvl: number) {
    if (lvl < 0) {
      lvl = 0;
    } else if (lvl > 4) {
      lvl = 4;
    }
    return this.usersLvl[lvl];
  }

  getLvl(lvl: number) {
    if (lvl < 0) {
      return 0;
    } else if (lvl > 4) {
      return 4;
    }
    return lvl;
  }

  newPassword(payload) {
    this.service.updatePasswordUser(payload.id, payload.password).subscribe(() => {
      this.refresh();
    });
  }

  showModal() {
    this.newUserModal.showModal();
  }

  result(value) {
    this.service.newUser(value).subscribe(value1 => {
      this.refresh();
    }, v => {this.message.error(v.error.message)});
  }
}
