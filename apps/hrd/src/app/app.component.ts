import { Component, OnDestroy } from '@angular/core';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';
import { DictionaryService } from '@services/dictionary.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hrd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private statusUserChangeSubs: Subscription;

  constructor(
    public service: HrdAuthService,
    private dictionaryService: DictionaryService,
    private translate: TranslateService
  ) {
    translate.addLangs(['uk', 'ru']);
    this.translate.setDefaultLang('uk');
    const browserLang = translate.getBrowserLang();
    translate.use(
      localStorage.getItem('lang') ? localStorage.getItem('lang') : 'uk'
    );
    this.statusUserChangeSubs = this.service.statusUserChange.subscribe(val => {
      if (val && val.status) {
        this.dictionaryService.refreshDictionaries();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.statusUserChangeSubs && !this.statusUserChangeSubs.closed) {
      this.statusUserChangeSubs.unsubscribe();
    }
    this.statusUserChangeSubs = null;
  }
}
