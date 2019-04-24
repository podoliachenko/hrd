import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { Document } from 'mongoose';

export const DictionarySchema: Schema = new mongoose.Schema(
  {
    name: String,
    label: String,
    value: Number,
    hide: Boolean
  }
);

export interface Dictionary extends Document {
  name: string;
  label: string;
  value: number;
  hide: boolean;
}
