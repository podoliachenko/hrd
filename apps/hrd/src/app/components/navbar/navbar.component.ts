import { Component, OnInit } from '@angular/core';
import { HrdAuthService } from '@services/hrd-auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hrd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private users = [
    'USERS.LVL.GUEST',
    'USERS.LVL.USER',
    'USERS.LVL.ADMIN',
    'USERS.LVL.SUPERVISOR',
    'USERS.LVL.DEV'
  ];

  constructor(public auth: HrdAuthService, public translate: TranslateService) {
  }

  ngOnInit() {
  }

  getStringLvl(lvl: number) {
    if (lvl < 0) {
      lvl = 0;
    } else if (lvl > 4) {
      lvl = 4;
    }
    return this.users[lvl];
  }

  changeLang() {
    if (this.translate.currentLang === 'uk') {
      this.translate.use('ru');
      localStorage.setItem('lang', 'ru');
    } else {
      this.translate.use('uk');
      localStorage.setItem('lang', 'uk');
    }
  }
}
