import { Component, OnDestroy } from '@angular/core';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from 'rxjs';
import { DictionaryService } from '@services/dictionary.service';

@Component({
  selector: 'hrd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  private statusUserChangeSubs: Subscription;

  constructor(
    public service: HrdAuthService,
    private dictionaryService: DictionaryService
  ) {
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
