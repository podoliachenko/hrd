import { StudentField } from '@interfaces/student-field';

export const student_fields: StudentField[] = [
  { field: 'last_name', default: true },
  { field: 'first_name', default: true },
  { field: 'patronymic', default: true },
  { field: 'group', default: true },
  {field: 'group_formation_year'},
  {
    field: 'birthday',
    default: true,
    type: 'date'
  },
  { field: 'inn' },
  { field: 'address' },
  { field: 'address2' },
  { field: 'phone_number'},
  {
    field: 'form_study',
    type: 'select',
    options: 'form_study'
  },
  {
    field: 'terms_training',
    type: 'select',
    options: 'terms_training'
  },
  {
    field: 'status',
    type: 'select',
    options: 'status'
  },
  { field: 'passport_series' },
  { field: 'passport_no'},
  {
    field: 'specialty',
    type: 'select',
    options: 'specialty'
  },
  {
    field: 'activity',
    type: 'select',
    options: 'activity'
  },
  {
    field: 'notes'
  },
  {field: 'date_of_enrollment',
    type: 'date'},
  {field: 'enrollment_order'},
  {field: 'date_of_graduation',
    type: 'date'},
  {field: 'graduation_order'},
  {field: 'diploma'},
  {field: 'diploma_registration_number'}
  // {field: 'date_action', header: 'ИНН'},
  // {field: 'order_date', header: 'Дата приказа'},
  // {field: 'output', header: 'ИНН'},
  // {field: 'privileges', header: 'ИНН'},
];
