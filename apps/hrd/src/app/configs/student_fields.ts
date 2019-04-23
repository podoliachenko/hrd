import { StudentField } from '@interfaces/student-field';

export const sudent_fields: StudentField[] = [
  { field: 'last_name', header: 'Забыл локализацию', default: true },
  { field: 'first_name', header: 'Забыл локализацию', default: true },
  { field: 'patronymic', header: 'Забыл локализацию', default: true },
  { field: 'group', header: 'Забыл локализацию', default: true },
  { field: 'birthday', header: 'Забыл локализацию', default: true, type: 'date' },
  { field: 'inn', header: 'Забыл локализацию' },
  { field: 'address', header: 'Забыл локализацию' },
  { field: 'address2', header: 'Забыл локализацию' },
  { field: 'phone_number', header: 'Забыл локализацию' },
  {
    field: 'form_study',
    header: 'Забыл локализацию',
    type: 'select',
    options: 'form_study'
  },
  {
    field: 'terms_training',
    header: 'Забыл локализацию',
    type: 'select',
    options: 'terms_training'
  },
  { field: 'status', header: 'Забыл локализацию', type: 'select', options: 'status' },
  { field: 'passport_series', header: 'Забыл локализацию' },
  { field: 'passport_no', header: 'Забыл локализацию' },
  {
    field: 'specialty',
    header: 'Забыл локализацию',
    type: 'select',
    options: 'specialty'
  }
  // {field: 'enrollment', header: 'Регистрация'},
  // {field: 'date_action', header: 'ИНН'},
  // {field: 'order_date', header: 'Дата приказа'},
  // {field: 'notes', header: 'ИНН'},
  // {field: 'output', header: 'ИНН'},
  // {field: 'privileges', header: 'ИНН'},
];
