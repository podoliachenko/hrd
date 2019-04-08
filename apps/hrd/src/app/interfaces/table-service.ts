import { BehaviorSubject, Observable } from 'rxjs';

export interface TableService {
  view(id: string);

  delete(id: string): Observable<any>;
}

export interface DynamicTableService extends TableService {
  $items: BehaviorSubject<any>;

  get(number: number, filters?: any, sort?: any);

  setFilter(name: string, value: string);

  setSort(sort: any);
}
