import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { StudentField } from '@interfaces/student-field';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR
} from '@workspace/node_modules/@angular/forms';
import { Subscription } from '@workspace/node_modules/rxjs';

@Component({
  selector: 'hrd-all-fields',
  templateUrl: './all-fields.component.html',
  styleUrls: ['./all-fields.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AllFieldsComponent),
      multi: true
    }
  ]
})
export class AllFieldsComponent implements OnInit, ControlValueAccessor, OnDestroy {


  @Input()
  get config(): StudentField[] {
    return this._config;
  }

  @Input() valid = new EventEmitter();

  @Input() alternateEdit = false;

  changeSubs: Subscription;

  onChange: Function;

  lastValues: any;

  set config(value: StudentField[]) {
    const form = new FormGroup({});

    this.unsubscribe();
    if (value) {
      value.forEach(value1 => {
        form.addControl(value1.field, new FormControl(null, value1.validators));
      });
      if (this.lastValues) {
        form.setValue(this.lastValues);
      }
      this.changeSubs = form.valueChanges.subscribe(value1 => {
        if (this.onChange) {
          this.onChange(value1);
          this.valid.emit(this.formGroup.valid);
        }
      });
    }
    this.formGroup = form;
    this._config = value;
  }

  @Input() schematic: any[];
  private _config: StudentField[];

  formGroup: FormGroup;

  constructor() {
  }

  ngOnInit() {

  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable();
    } else {
      this.formGroup.enable();
    }
  }

  writeValue(obj: any): void {
    this.lastValues = obj;
    if (this.formGroup && this.lastValues) {
      this.formGroup.setValue(this.lastValues);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  unsubscribe() {
    if (this.changeSubs) {
      if (!this.changeSubs.closed) {
        this.changeSubs.unsubscribe();
        this.changeSubs = null;
      } else {
        this.changeSubs = null;
      }
    }
  }

}
