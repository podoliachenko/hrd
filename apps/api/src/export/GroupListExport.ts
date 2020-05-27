import { ExcelExport } from './ExcelExport';

export class GroupListExport extends ExcelExport {

  private styleForTable;

  constructor(protected args: GroupListExportParams) {
    super(args);
  }


  protected formData() {
    this.makeHeader();
    this.fillHeader();
    this.fillContent();
  }

  private makeHeader() {
    this.ws.column(1).setWidth(50 / 8.1);
    this.ws.column(2).setWidth(260 / 8.1);
    this.ws.column(3).setWidth(110 / 8.1);
    this.ws.column(4).setWidth(110 / 8.1);
    this.ws.column(5).setWidth(110 / 8.1);
  }

  private fillHeader() {
    this.ws.cell(1, 1).string(this.args.department).style({ readOrder: 'contextDependent' }).style({
      font: { bold: true }
    });
    this.ws.cell(2, 5).string(`${this.capitalize(this.args.form_study)} форма навчання`)
      .style({ alignment: { horizontal: 'right' } });
    this.ws.cell(3, 1, 3, 5, true).string(this.args.course)
      .style({
        alignment: { horizontal: 'center' },
        font: { bold: true }
      });
    this.ws.row(4).setHeight(10);
    this.ws.cell(5, 1, 5, 5, true).string(this.args.specialty)
      .style({ alignment: { horizontal: 'center', shrinkToFit: true } });
    this.ws.row(6).setHeight(10);
    this.ws.cell(7, 1, 7, 5, true).string(this.args.group)
      .style({ alignment: { horizontal: 'center' }, font: { bold: true } });
    this.ws.row(8).setHeight(12);
    this.ws.cell(8, 1, 8, 5, true).string(this.args.status)
      .style({ alignment: { horizontal: 'center' }, font: { size: 10, bold: true } });
    this.ws.row(9).setHeight(10);
  }

  private fillContent() {
    this.styleForTable = {
      alignment: {
        horizontal: 'center', vertical: 'center', wrapText: true
      },
      font: { bold: true },
      border: {
        left: {
          style: 'thin'
        },
        right: {
          style: 'thin'
        },
        top: {
          style: 'thin'
        },
        bottom: {
          style: 'thin'
        }
      }
    };
    this.fillHeaderContent();
  }

  private fillHeaderContent() {
    this.ws.cell(10, 1).string('№ з/п').style(this.styleForTable);
    this.ws.cell(10, 2).string('Прізвище, ім\'я, по-батькові').style(this.styleForTable);
    this.ws.cell(10, 3).string('Джерело фінансування').style(this.styleForTable);
    this.ws.cell(10, 4).string('Статус').style(this.styleForTable);
    this.ws.cell(10, 5).string('Примітка').style(this.styleForTable);
    console.log(this.args);
    this.styleForTable.font.bold = false;
    let i;
    for (i = 0; i < this.args.students.length; i++) {
      this.ws.cell(11 + i, 1).number((i + 1)).style(this.styleForTable);
      this.ws.cell(11 + i, 2).string(this.args.students[i].full_name).style(this.styleForTable);
      this.ws.cell(11 + i, 3).string(this.args.students[i].terms_training).style(this.styleForTable);
      this.ws.cell(11 + i, 4).string(this.args.students[i].status).style(this.styleForTable);
      this.ws.cell(11 + i, 5).string(this.args.students[i].notes).style(this.styleForTable);
    }
    this.fillFooter(11 + i);
  }

  private fillFooter(i: number) {
    const tt = [];
    this.args.students.forEach(value => {
      const tempTT = tt.find(v => v.name === value.terms_training);
      if(tempTT) {
        tempTT.count++;
      } else {
        tt.push({name: value.terms_training, count: 1})
      }
    });
    tt.forEach((value, index) => {
      this.ws.cell(i + index, 1).string(`Форма навчання "${value.name}" - ${value.count}`);
      this.ws.row(i+index).setHeight(26);
    })
    i += tt.length;
    const st = [];
    this.args.students.forEach(value => {
      const tempST = st.find(v => v.name === value.status);
      if(tempST) {
        tempST.count++;
      } else {
        st.push({name: value.status, count: 1})
      }
    });
    st.forEach((value, index) => {
      this.ws.cell(i + index, 1).string(`Статус "${value.name}" - ${value.count}`);
      this.ws.row(i+index).setHeight(26);
    })
  }

  private capitalize(s) {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

}

export interface GroupListExportParams {
  group?: string;
  specialty?: string;
  course?: string;
  status?: string;
  form_study?: string;
  department?: string;
  students?: GroupListExportStudents[];
}

export interface GroupListExportStudents {
  full_name?: string;
  terms_training?: string;
  status?: string;
  notes?: string;
}
