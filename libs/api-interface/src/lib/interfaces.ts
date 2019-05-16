import { ObjectId } from 'bson';

export interface Log {
  _id: ObjectId;
  userId: ObjectId;
  user: any;
  targetId?: ObjectId;
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
