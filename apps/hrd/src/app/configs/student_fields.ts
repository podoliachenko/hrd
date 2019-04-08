import { StudentField } from '@interfaces/student-field';

export const sudent_fields: StudentField[] = [
  { field: 'last_name', header: 'Фамилия', default: true },
  { field: 'first_name', header: 'Имя', default: true },
  { field: 'patronymic', header: 'Отчество', default: true },
  { field: 'group', header: 'Группа', default: true },
  { field: 'birthday', header: 'День рождения', default: true, type: 'date' },
  { field: 'inn', header: 'ИНН' },
  { field: 'address', header: 'Адрес прописки' },
  { field: 'address2', header: 'Адрес проживания' },
  { field: 'phone_number', header: 'Номер телефона' },
  {
    field: 'form_study',
    header: 'Форма обучения',
    type: 'select',
    options: 'form_study'
  },
  {
    field: 'terms_training',
    header: 'Условия обучения',
    type: 'select',
    options: 'terms_training'
  },
  { field: 'status', header: 'Статус', type: 'select', options: 'status' },
  { field: 'passport_series', header: 'Серия паспорта' },
  { field: 'passport_no', header: 'Номер паспорта' },
  {
    field: 'specialty',
    header: 'Специальность',
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
