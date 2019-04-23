import { StudentField } from '@interfaces/student-field';
import { sudent_fields } from '@configs/student_fields';
import { TableService } from '@interfaces/table-service';
import { Input } from '@angular/core';

export class HrdTable {
  @Input() columns: StudentField[];
  @Input() saveStorageName = 'fields';
  @Input() tableService: TableService;
  protected _selectedColumns: StudentField[];
  public items: any[];
  itemsMenu: any;
  selected: any;

  constructor() {
    this.itemsMenu = [
      {
        label: 'Посмотреть',
        icon: 'pi pi-search',
        command: () => this.view(this.selected)
      },
      {
        label: 'Удалить',
        icon: 'pi pi-times',
        command: () => this.delete(this.selected)
      }
    ];
  }

  get selectedColumns(): StudentField[] {
    if (!this._selectedColumns) {
      if (localStorage[this.saveStorageName]) {
        this._selectedColumns = JSON.parse(localStorage[this.saveStorageName]);
      } else {
        this._selectedColumns = sudent_fields.filter(val => val.default);
      }
    }
    return this._selectedColumns;
  }

  set selectedColumns(value: StudentField[]) {
    localStorage[this.saveStorageName] = JSON.stringify(value);
    this._selectedColumns = value;
  }

  protected view(selected: any) {
    this.tableService.view(selected._id);
  }

  protected delete(selected: any) {
    this.tableService.delete(selected._id).subscribe(() => {
      this.items.splice(this.items.findIndex(v => v === selected), 1);
    });
  }
}
