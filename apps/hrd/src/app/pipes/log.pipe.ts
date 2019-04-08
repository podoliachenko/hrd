import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'log'
})
export class LogPipe implements PipeTransform {
  transform(value: any, arg?: any): any {
    console.log(arg ? arg : 'pipelog:', value);
    return value;
  }
}
