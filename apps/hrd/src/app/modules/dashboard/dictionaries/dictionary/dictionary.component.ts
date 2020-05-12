import { Component, OnInit } from '@angular/core';
import { DictionaryService } from '@services/dictionary.service';
import { ActivatedRoute } from '@angular/router';
import { DictionaryOptionSetting } from '@interfaces/dictionary';
import { HrdAuthService } from '@services/hrd-auth.service';

@Component({
  selector: 'hrd-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {
  display: boolean;

  constructor(
    public service: DictionaryService,
    public route: ActivatedRoute,
    public auth: HrdAuthService
  ) {
  }

  ngOnInit() {
  }

  editName(dictionary: DictionaryOptionSetting, input) {
    if (dictionary.edit) {
      this.service
        .renameDictionaryElement(dictionary._id, input.value)
        .subscribe();
      dictionary.edit = false;
    } else {
      dictionary.edit = true;
      setTimeout(() => {
        input.focus();
      }, 0);
    }
  }

  addDictionaryElement(value: string) {
    const dictionary = this.route.snapshot.params['dictionary'];
    this.service.newDictionaryElement(dictionary, value).subscribe(() => {
      this.display = false;
    });
  }

  hide(dictionary: DictionaryOptionSetting, b: boolean) {
    this.service.hideDictionaryElement(dictionary._id, b).subscribe();
  }
}
