import { Document, Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import { ObjectId } from 'bson';

export const LoggerSchema: Schema = new mongoose.Schema(
  {
    userId: ObjectId,
    status: Number,
    method: String,
    date: Date,
    message: String,
    url: String,
    params: Object,
    body: Object,
    query: Object,
    stack: String
  },
  { collection: 'logs' }
);

export interface LoggerDB extends Document {
  _id: ObjectId;
  userId: ObjectId;
  status: number;
  method: string;
  date: Date;
  message: string;
  url: string;
  params: any;
  body: any;
  query: any;
  stack: string;
}
