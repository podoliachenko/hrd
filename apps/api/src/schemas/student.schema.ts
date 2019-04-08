import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';

export const StudentSchema: Schema = new mongoose.Schema(
  {
    first_name: String,
    group: String,
    patronymic: String,
    last_name: String,
    birthday: Date,
    inn: Number,
    address: String,
    address2: String,
    phone_number: String,
    form_study: Number,
    terms_training: Number,
    status: Number,
    specialty: Number,
    passport_series: String,
    passport_no: String,
    enrollment: String,
    date_action: Date,
    order_date: Date,
    notes: String,
    output: Date,
    privileges: Date
  },
  { versionKey: false }
).plugin(pagination);
