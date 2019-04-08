import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fixColumns'
})
export class FixColumnsPipe implements PipeTransform {
  transform(value: any[], args?: any): any {
    return value.filter(val => val);
  }
}
