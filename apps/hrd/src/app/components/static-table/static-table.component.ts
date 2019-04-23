import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HrdTable } from '@classes/hrd-table';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrd-static-table',
  templateUrl: './static-table.component.html',
  styleUrls: ['./static-table.component.scss']
})
export class StaticTableComponent extends HrdTable implements OnInit, OnDestroy {
  @Input() items: any[];

  subsctiptionLang: Subscription;

  constructor(private translate: TranslateService) {
    super();
    this.changeLangContext();
    this.subsctiptionLang = this.translate.onLangChange.subscribe(lang => {
      this.changeLangContext();
    });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.subsctiptionLang || !this.subsctiptionLang.closed) {
      this.subsctiptionLang.unsubscribe();
      this.subsctiptionLang = null;
    }
  }

  changeLangContext() {
    this.translate.get(['CONST.DELETE', 'CONST.VIEW']).subscribe(value => {
      this.itemsMenu = [
        {
          label: value['CONST.VIEW'],
          icon: 'pi pi-search',
          command: () => this.view(this.selected)
        },
        {
          label: value['CONST.DELETE'],
          icon: 'pi pi-times',
          command: () => this.delete(this.selected)
        }
      ];
    });
  }
}
