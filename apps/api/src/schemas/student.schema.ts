import { Document, Schema } from 'mongoose';
import * as pagination from 'mongoose-paginate-v2';

export const StudentSchema: Schema = new Schema(
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
    diploma_registration_number: String,
    department: Number
    // privileges: Date
  }
).plugin(pagination);

export interface Student extends Document {
  first_name: string;
  group: string;
  patronymic: string;
  last_name: string;
  birthday: Date;
  inn: number;
  address: string;
  address2: string;
  phone_number: string;
  form_study: string;
  terms_training: number;
  status: number;
  specialty: number;
  activity: number;
  passport_series: string;
  passport_no: string;
  date_of_enrollment: Date;
  group_formation_year: number;
  enrollment_order: string;
  notes: string;
  date_of_graduation: Date;
  graduation_order: string;
  diploma: string;
  diploma_registration_number: string;
  department: number;
}
