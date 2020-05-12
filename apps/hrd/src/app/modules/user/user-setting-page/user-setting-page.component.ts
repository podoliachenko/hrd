import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@workspace/node_modules/@angular/forms';
import { HrdAuthService } from '@services/hrd-auth.service';
import { UsersService } from '@services/users.service';
import { DictionaryService } from '@services/dictionary.service';
import { NzMessageService } from '@workspace/node_modules/ng-zorro-antd';

@Component({
  selector: 'hrd-user-setting-page',
  templateUrl: './user-setting-page.component.html',
  styleUrls: ['./user-setting-page.component.scss']
})
export class UserSettingPageComponent implements OnInit {
  formName: FormGroup;
  formPassword: FormGroup;

  @ViewChild('passwordSuccess', {static: true}) passwordSuccessRef;

  constructor(private auth: HrdAuthService,
              private message: NzMessageService,
              private user: UsersService, private dictionary: DictionaryService) {
  }

  ngOnInit() {
    this.formName = new FormGroup({
      fullName: new FormControl(this.auth.user.fullName, { validators: [Validators.required] })
    });
    this.formPassword = new FormGroup({
      currentPassword: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, Validators.required),
      newPasswordRepeat: new FormControl(null, Validators.required)
    });
  }


  private passwordNotMatch() {
    return this.formPassword.get('newPasswordRepeat').value !== this.formPassword.get('newPassword').value;
  }

  private notMatch(control: AbstractControl): boolean {
    return control.value === this.auth.user.fullName;
  };

  formNameSubmit() {
    this.user.changeName(this.formName.get('fullName').value).subscribe(() => {
      this.auth.needNewToken = true;
      this.dictionary.refreshDictionaries();
    });
  }

  formPasswordSubmit() {
    this.user.changePassword(this.formPassword.get('currentPassword').value, this.formPassword.get('newPasswordRepeat').value).subscribe(value => {
      this.auth.needNewToken = true;
      this.message.success(this.passwordSuccessRef);
      this.formPassword.patchValue({
        currentPassword: '',
        newPassword: '',
        newPasswordRepeat: ''
      });
      this.formPassword.reset();
      this.dictionary.refreshDictionaries();
    }, error => this.message.error(error.message));
  }
}
