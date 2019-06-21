import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@workspace/node_modules/@angular/forms';
import { StudentField } from '@interfaces/student-field';
import { DictionaryService } from '@services/dictionary.service';

@Component({
  selector: 'hrd-universal-field',
  templateUrl: './universal-field.component.html',
  styleUrls: ['./universal-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UniversalFieldComponent),
      multi: true
    }
  ]
})
export class UniversalFieldComponent implements OnInit, ControlValueAccessor {

  @Input() config: StudentField;

  @Input() disableLabel = false;

  @Input() alternateEdit = false;

  @Input() loadingButton = false;

  @Input() loadingText = 'CONST.WAIT';

  value: any;
  onChange: Function;
  onTouched: Function;
  isDisabled: boolean;

  isEdit: boolean;
  tempValue: any;

  constructor(public dictionaryService: DictionaryService) {
  }

  ngOnInit() {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  writeValue(obj: any): void {
    this.value = obj;
    if (this.alternateEdit) {
      this.tempValue = obj;
    }
  }

  change(value: any) {
    if (this.alternateEdit) {
      this.tempValue = value;
    } else {
      if (this.onChange) {
        this.onChange(value);
      }
    }
  }

  changeStateButton() {
    if (this.isEdit) {
      if (this.onChange) {
        this.onChange(this.tempValue);
      }
      this.isEdit = false;
    } else {
      this.isEdit = true;
    }
  }

  required(config) {
    if(config.validators) {
      return config.validators.includes(Validators.required)
    } else {
      return false;
    }
  }

}
