import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '@services/dictionary.service';

@Component({
  selector: 'hrd-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dictionaryService: DictionaryService) {
  }

  ngOnInit() {
    this.dictionaryService.refreshDictionaries();
  }

}
