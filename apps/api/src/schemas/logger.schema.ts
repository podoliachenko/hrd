import { Document, Schema } from 'mongoose';
import { ObjectId } from 'bson';
import { Log } from '@hrd/api-interface';

export const LoggerSchema: Schema = new Schema(
  {
    userId: ObjectId,
    targetId: ObjectId,
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

export interface LoggerDB extends Document, Log {
}
