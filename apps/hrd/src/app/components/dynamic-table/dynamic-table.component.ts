import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HrdTable } from '@classes/hrd-table';
import { DynamicTableService } from '@interfaces/table-service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HrdAuthService } from '@services/hrd-auth.service';

@Component({
  selector: 'hrd-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent extends HrdTable
  implements OnInit, OnDestroy {
  @Input() tableService: DynamicTableService;
  subsctiption: Subscription;
  subsctiptionLang: Subscription;
  total = 0;

  constructor(private translate: TranslateService, private auth: HrdAuthService) {
    super();
    this.changeLangContext();
    this.subsctiptionLang = this.translate.onLangChange.subscribe(lang => {
      this.changeLangContext();
    });
  }

  ngOnInit() {
    this.subsctiption = this.tableService.$items.subscribe(value => {
      this.items = value.docs;
      this.total = value.totalDocs;
    });
  }

  ngOnDestroy(): void {
    if (this.subsctiption || !this.subsctiption.closed) {
      this.subsctiption.unsubscribe();
      this.subsctiption = null;
    }
    if (this.subsctiptionLang || !this.subsctiptionLang.closed) {
      this.subsctiptionLang.unsubscribe();
      this.subsctiptionLang = null;
    }
  }

  filter(text, filed) {
    this.tableService.setFilter(filed, text);
  }

  sort(event) {
    const val = {};
    val[event.field] = event.order;
    this.tableService.setSort(val);
  }

  changePage(event) {
    this.tableService.get((event.first + event.rows) / event.rows);
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
}
