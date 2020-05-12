import { ObjectId } from 'bson';


export interface DictionaryOption {
  _id: any;
  label: string;
  value: number;
  hide?: boolean;
}

export interface DictionaryOptionSetting extends DictionaryOption {
  edit: boolean;
}

export interface Dictionary {
  name: string;
  options: DictionaryOption[];
  history: any[];
}

export interface LogHeader {
  id: ObjectId;
  type: string;
  date: string;
  user: string;
}
