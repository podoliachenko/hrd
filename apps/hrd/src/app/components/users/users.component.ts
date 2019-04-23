import { Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '@services/users.service';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrd-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  // TODO: вынести в отдельный файл
  private usersLvl = [
    'USERS.LVL.GUEST',
    'USERS.LVL.USER',
    'USERS.LVL.ADMIN',
    'USERS.LVL.SUPERVISOR',
    'USERS.LVL.DEV'
  ];
  users: any[];

  statusUserSubs: Subscription;

  constructor(private service: UsersService, private auth: HrdAuthService) {}

  ngOnInit() {
    this.statusUserSubs = this.auth.statusUserChange.subscribe(value => {
      if (value && value.status) {
        this.service.getUsers().subscribe((value2: any[]) => {
          this.users = value2;
        });
      } else {
        this.users = [];
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statusUserSubs && !this.statusUserSubs.closed) {
      this.statusUserSubs.unsubscribe();
    }
    this.statusUserSubs = null;
  }

  changeLevel(target, index: number) {
    const lvl = target.value;
    const oldLvl = this.users[index].privilege;
    console.log(lvl, index);
    if (lvl !== this.users[index]) {
      this.service.changeLvl(lvl, this.users[index].id).subscribe(
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
}
