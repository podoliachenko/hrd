import { Component, isDevMode, OnInit } from '@angular/core';
import { HrdAuthService } from '@services/hrd-auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@environment';
import { NzI18nService, ru_RU, uk_UA } from '@workspace/node_modules/ng-zorro-antd';

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

  version = environment.version;
  isDevMode = isDevMode;

  constructor(public auth: HrdAuthService, public translate: TranslateService,
              private i18n: NzI18nService) {
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
      this.i18n.setLocale(ru_RU);

    } else {
      this.translate.use('uk');
      localStorage.setItem('lang', 'uk');
      this.i18n.setLocale(uk_UA);
    }
  }
}
