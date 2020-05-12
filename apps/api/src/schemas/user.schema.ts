import { Document, Schema } from 'mongoose';

export const UserSchema: Schema = new Schema(
  {
    userName: String,
    fullName: String,
    password: String,
    privilege: Number,
    refreshToken: String,
    ...{
      full_name: String,
      email: String,
      id: String
    }
  }
);

export interface OldUser extends Document {
  full_name?: string;
  email?: string;
  id?: string;
}

export interface User extends OldUser {
  userName?: string;
  fullName?: string;
  password?: string;
  privilege?: number;
  refreshToken?: string;
}

export function toPublicUser(user: User) {
  const newData = {};
  for (const key of Object.keys(user)
    .filter(v => ['userName', 'fullName', 'privilege', 'full_name', 'email', '_id', 'id']
      .some(v2 => v === v2))) {
    newData[key] = user[key];
  }
  return newData;
}
