import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Document } from 'mongoose';

export const UserSchema: Schema = new mongoose.Schema(
  {
    id: String,
    token: String,
    full_name: String,
    email: String,
    privilege: Number,
    img: String
  }
);

export interface User extends Document {
  _id: string;
  id: string;
  token: string;
  full_name: string;
  email: string;
  privilege: number;
  img: string;
}
