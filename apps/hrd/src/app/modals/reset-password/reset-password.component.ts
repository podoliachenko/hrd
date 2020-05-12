import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@workspace/node_modules/@angular/forms';

@Component({
  selector: 'hrd-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  isVisible = false;

  @Output() newPassword = new EventEmitter();

  formGroup: FormGroup;

  payload: any;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  showModal(payload: {
    [key: string]: any
  } = {}): void {
    this.formGroup = null;
    this.cdr.detectChanges();
    this.formGroup = new FormGroup({
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
    }, {
      validators: [this.passwordConfirming]
    });
    this.payload = payload;
    this.formGroup.patchValue(payload.initState || {});
    this.isVisible = true;
  }

  handleOk(): void {
    this.newPassword.emit({ ...this.formGroup.value, ...this.payload });
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  passwordConfirming(control: AbstractControl) {
    if (control && control.get('password').value === control.get('confirmPassword').value) {
      const err = control.get('confirmPassword').errors;

      if (err && err.repeatFailed) {
        delete err.repeatFailed;
        control.get('confirmPassword').setErrors(Object.keys(err).length ? err : null);
      }


      return null;
    }
    if (control) {
      control.get('confirmPassword').setErrors({
        ...control.get('confirmPassword').errors,
        repeatFailed: true
      });
    }
    return { repeatFailed: true };
  };
}
