import { Document, Schema } from 'mongoose';

export const DictionarySchema: Schema = new Schema(
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
