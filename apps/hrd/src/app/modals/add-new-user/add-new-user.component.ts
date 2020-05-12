import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef, EventEmitter, Output } from '@workspace/node_modules/@angular/core';
import { FormControl, FormGroup, Validators } from '@workspace/node_modules/@angular/forms';
import { HrdAuthService } from '@services/hrd-auth.service';

@Component({
  selector: 'hrd-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent {

  isVisible = false;

  @Output() result = new EventEmitter();

  formGroup: FormGroup;

  private usersLvl = [
    'USERS.LVL.GUEST',
    'USERS.LVL.USER',
    'USERS.LVL.ADMIN',
    'USERS.LVL.SUPERVISOR',
    'USERS.LVL.DEV'
  ];
  passwordVisible: any;

  constructor(private cdr: ChangeDetectorRef, private auth: HrdAuthService) {
  }

  showModal(payload: {
    [key: string]: any
  } = {}): void {
    this.formGroup = null;
    this.cdr.detectChanges();
    this.formGroup = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      privilege: new FormControl(1, [Validators.required]),
    });
    this.formGroup.patchValue(payload.initState || {});
    this.isVisible = true;
  }

  handleOk(): void {
    this.result.emit(this.formGroup.value);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getLvl(lvl: number) {
    if (lvl < 0) {
      return 0;
    } else if (lvl > 4) {
      return 4;
    }
    return lvl;
  }
}
