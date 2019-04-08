import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Dictionary,
  DictionaryOption,
  DictionaryOptionSetting
} from '@interfaces/dictionary';
import { map } from 'rxjs/operators';

@Injectable()
export class DictionaryService {
  private dictionaries: Dictionary[];

  constructor(private http: HttpClient) {
    this.dictionaries = [];
  }

  refreshDictionaries() {
    this.http.get('/dictionary').subscribe((value: Dictionary[]) => {
      this.dictionaries = value;
    });
  }

  getDictionary(name: string): DictionaryOption[] {
    const find = this.dictionaries.find(value => value.name === name);
    return find ? find.options : [];
  }

  getDictionarySelect(name: string): DictionaryOption[] {
    return this.getDictionary(name).filter(value => !value.hide);
  }

  getDictionarySetting(name: string): DictionaryOptionSetting[] {
    return <DictionaryOptionSetting[]>this.getDictionary(name);
  }

  newDictionaryElement(name: string, label: string) {
    return this.http.post(`/dictionary/${name}`, { label }).pipe(
      map(val => {
        this.refreshDictionaries();
        return val;
      })
    );
  }

  renameDictionaryElement(_id: string, label: string) {
    return this.http.patch(`/dictionary/${_id}`, { label }).pipe(
      map(val => {
        this.refreshDictionaries();
        return val;
      })
    );
  }

  hideDictionaryElement(_id: string, hide: boolean) {
    return this.http.patch(`/dictionary/hide/${_id}`, { hide }).pipe(
      map(val => {
        this.refreshDictionaries();
        return val;
      })
    );
  }
}
