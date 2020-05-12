import { Pipe, PipeTransform } from '@angular/core';
import { HrdAuthService } from '@services/hrd-auth.service';

@Pipe({
  name: 'hrdPrivilege'
})
export class HrdPrivilegePipe implements PipeTransform {

  constructor(private auth: HrdAuthService) {
  }

  transform(value: number): any {
    return this.auth.user.privilege >= value;
  }

}
