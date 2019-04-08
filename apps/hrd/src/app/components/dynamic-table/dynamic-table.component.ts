import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HrdTable } from '@classes/hrd-table';
import { DynamicTableService } from '@interfaces/table-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'hrd-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent extends HrdTable
  implements OnInit, OnDestroy {
  @Input() tableService: DynamicTableService;
  subsctiption: Subscription;
  total = 0;

  constructor() {
    super();
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
}
