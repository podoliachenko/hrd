import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DictionaryService } from '@services/dictionary.service';

@Pipe({
  name: 'stringify'
})
export class StringifyPipe implements PipeTransform {
  constructor(private dictionaryService: DictionaryService) {}

  transform(value: any, colInfo: any, def: string = ''): string {
    if (value !== 0 && !value) {
      return def;
    }
    if (!colInfo.type) {
      return value;
    }
    if (colInfo.type === 'select') {
      const val = this.dictionaryService
        .getDictionary(colInfo.options)
        .find(value1 => value1.value === Number(value));
      return val ? val.label : '';
    } else if (colInfo.type === 'date') {
      return new DatePipe('en-US').transform(value, 'dd.MM.yyyy');
    }
  }
}
