import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HrdTable } from '@classes/hrd-table';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { HrdAuthService } from '@services/hrd-auth.service';
import { DictionaryService } from '@services/dictionary.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { log } from 'util';


@Component({
  selector: 'hrd-static-table',
  templateUrl: './static-table.component.html',
  styleUrls: ['./static-table.component.scss']
})
export class StaticTableComponent extends HrdTable implements OnInit, OnDestroy {
  @Input() items: any[];

  subsctiptionLang: Subscription;

  constructor(private translate: TranslateService, private auth: HrdAuthService,
              public dictionaryService: DictionaryService) {
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
        }
      ];
      if (this.auth.checkPrivilege(2)) {
        this.itemsMenu.push(
          {
            label: value['CONST.DELETE'],
            icon: 'pi pi-times',
            command: () => this.delete(this.selected)
          });
      }
    });
  }

  filterDate(date) {
    return moment(date).utc().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
  }
}
