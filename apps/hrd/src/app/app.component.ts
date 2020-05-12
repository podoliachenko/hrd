import { Component, OnDestroy, OnInit } from '@angular/core';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';
import { DictionaryService } from '@services/dictionary.service';
import { TranslateService } from '@ngx-translate/core';
import { NzI18nService, ru_RU, uk_UA } from '@workspace/node_modules/ng-zorro-antd';

@Component({
  selector: 'hrd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  private statusUserChangeSubs: Subscription;

  constructor(
    public service: HrdAuthService,
    private dictionaryService: DictionaryService,
    private translate: TranslateService,
    private i18n: NzI18nService
  ) {
    translate.addLangs(['uk', 'ru']);
    this.translate.setDefaultLang('uk');
    const browserLang = translate.getBrowserLang();
    translate.use(
      localStorage.getItem('lang') ? localStorage.getItem('lang') : 'uk'
    );
    if (translate.currentLang === 'uk') {
      this.i18n.setLocale(uk_UA);
    } else if (translate.currentLang === 'ru') {
      this.i18n.setLocale(ru_RU);
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.statusUserChangeSubs && !this.statusUserChangeSubs.closed) {
      this.statusUserChangeSubs.unsubscribe();
    }
    this.statusUserChangeSubs = null;
  }
}
