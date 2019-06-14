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
    activity: Number,
    passport_series: String,
    passport_no: String,
    date_of_enrollment: Date,
    group_formation_year: Number,
    enrollment_order: String,
    notes: String,
    date_of_graduation: Date,
    graduation_order: String,
    diploma: String,
    diploma_registration_number: String
    // privileges: Date
  }
).plugin(pagination);
