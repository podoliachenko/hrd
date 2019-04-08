export interface DictionaryOption {
  _id: string;
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
}
