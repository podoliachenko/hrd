import { Component } from '@angular/core';
import { ChangeDetectorRef, EventEmitter, Output } from '@workspace/node_modules/@angular/core';
import { FormControl, FormGroup, Validators } from '@workspace/node_modules/@angular/forms';

@Component({
  selector: 'hrd-add-element-dictionary',
  templateUrl: './add-element-dictionary.component.html',
  styleUrls: ['./add-element-dictionary.component.css']
})
export class AddElementDictionaryComponent {

  isVisible = false;

  @Output() name = new EventEmitter();

  formGroup: FormGroup;


  constructor(private cdr: ChangeDetectorRef) {
  }

  showModal(payload: {
    [key: string]: any
  } = {}): void {
    this.formGroup = null;
    this.cdr.detectChanges();
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
    this.formGroup.patchValue(payload.initState || {});
    this.isVisible = true;
  }

  handleOk(): void {
    this.name.emit(this.formGroup.value.name);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
