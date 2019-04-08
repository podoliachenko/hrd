import { Component, Input, OnInit } from '@angular/core';
import { HrdTable } from '@classes/hrd-table';

@Component({
  selector: 'hrd-static-table',
  templateUrl: './static-table.component.html',
  styleUrls: ['./static-table.component.scss']
})
export class StaticTableComponent extends HrdTable implements OnInit {
  @Input() items: any[];

  constructor() {
    super();
  }

  ngOnInit() {}
}
