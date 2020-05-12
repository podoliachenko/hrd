import { Component, OnDestroy, OnInit } from '@angular/core';
import { dictionaries_menu } from '@configs/dictionaries_menu';
import { DictionaryService } from '@services/dictionary.service';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrd-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.scss']
})
export class DictionariesComponent implements OnInit, OnDestroy {
  dictionaries_menu = dictionaries_menu;

  statusUserChangeSubs: Subscription;

  constructor(
    private service: DictionaryService,
    private auth: HrdAuthService
  ) {
  }

  ngOnInit() {
    this.service.refreshDictionaries();
  }

  ngOnDestroy(): void {
    if (this.statusUserChangeSubs && !this.statusUserChangeSubs.closed) {
      this.statusUserChangeSubs.unsubscribe();
    }
    this.statusUserChangeSubs = null;
  }
}
