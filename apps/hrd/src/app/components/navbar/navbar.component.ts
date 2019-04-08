import { Component, OnInit } from '@angular/core';
import { HrdAuthService } from '@services/hrd-auth.service';

@Component({
  selector: 'hrd-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private users = [
    'Гость',
    'Пользователь',
    'Администратор бд',
    'Администратор',
    'Разработчик'
  ];

  constructor(public auth: HrdAuthService) {}

  ngOnInit() {}

  getStringLvl(lvl: number) {
    if (lvl < 0) {
      lvl = 0;
    } else if (lvl > 4) {
      lvl = 4;
    }
    return this.users[lvl];
  }
}
