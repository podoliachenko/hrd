import { StudentField } from '@interfaces/student-field';
import { Validators } from '@workspace/node_modules/@angular/forms';

export const student_fields: StudentField[] = [
  { field: 'last_name', default: true, validators: [Validators.required] },
  { field: 'first_name', default: true, validators: [Validators.required] },
  { field: 'patronymic', default: true },
  { field: 'group', default: true, validators: [Validators.required] },
  { field: 'group_formation_year', type: 'number', validators: [Validators.required] },
  {
    field: 'birthday',
    default: true,
    type: 'date'
  },
  { field: 'inn', type: 'number' },
  { field: 'address' },
  { field: 'address2' },
  { field: 'phone_number' },
  {
    field: 'form_study',
    type: 'select',
    options: 'form_study', validators: [Validators.required]
  },
  {
    field: 'terms_training',
    type: 'select',
    options: 'terms_training', validators: [Validators.required]
  },
  {
    field: 'status',
    type: 'select',
    options: 'status', validators: [Validators.required]
  },
  { field: 'passport_series' },
  { field: 'passport_no' },
  {
    field: 'specialty',
    type: 'select',
    options: 'specialty', validators: [Validators.required]
  },
  {
    field: 'activity',
    type: 'select',
    options: 'activity', validators: [Validators.required]
  },
  {
    field: 'notes', type: 'text'
  },
  {
    field: 'date_of_enrollment',
    type: 'date'
  },
  { field: 'enrollment_order' },
  {
    field: 'date_of_graduation',
    type: 'date'
  },
  { field: 'graduation_order' },
  { field: 'diploma' },
  { field: 'diploma_registration_number' },
  { field: 'department', type: 'select', options: 'department', validators: [Validators.required] }
  // {field: 'date_action', header: 'ИНН'},
  // {field: 'order_date', header: 'Дата приказа'},
  // {field: 'output', header: 'ИНН'},
  // {field: 'privileges', header: 'ИНН'},
];

export const student_schematic = [
  {
    name: 'FIELD_GROUP.PERSONAL_INFORMATION',
    class: '',
    fields: [
      { index: 0, class: 'ant-col-8 p-2' },
      { index: 1, class: 'ant-col-8 p-2' },
      { index: 2, class: 'ant-col-8 p-2' },
      { index: 5, class: 'ant-col-8 p-2' },
      { index: 9, class: 'ant-col-8 p-2' },
      { index: 7, class: 'ant-col-8 p-2' },
      { index: 8, class: 'ant-col-8 p-2' },
      { index: 6, class: 'ant-col-8 p-2' },
      { index: 13, class: 'ant-col-4 p-2' },
      { index: 14, class: 'ant-col-4 p-2' }
    ]
  }, {
    name: 'FIELD_GROUP.EDUCATIONAL_INFORMATION',
    class: '',
    fields: [
      { index: 11, class: 'ant-col-8 p-2' },
      { index: 10, class: 'ant-col-8 p-2' },
      { index: 12, class: 'ant-col-8 p-2' },
      { index: 15, class: 'ant-col-8 p-2' },
      { index: 16, class: 'ant-col-8 p-2' },
      { index: 24, class: 'ant-col-8 p-2' },
      { index: 17, class: 'ant-col-24 p-2' }
    ]
  }, {
    name: 'FIELD_GROUP.GROUP',
    class: '',
    fields: [
      { index: 3, class: 'ant-col-8 p-2' },
      { index: 4, class: 'ant-col-8 p-2' }
    ]
  }, {
    name: 'FIELD_GROUP.GRADUATION_AND_ENROLLMENT',
    class: '',
    fields: [
      { index: 18, class: 'ant-col-8 p-2' },
      { index: 19, class: 'ant-col-8 p-2' },
      { index: 20, class: 'ant-col-8 p-2' },
      { index: 21, class: 'ant-col-8 p-2' }
    ]
  }, {
    name: 'FIELD_GROUP.DIPLOMA',
    class: '',
    fields: [
      { index: 22, class: 'ant-col-8 p-2' },
      { index: 23, class: 'ant-col-8 p-2' }
    ]
  }
];
