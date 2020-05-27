import * as xl from 'excel4node'

export class ExcelExport {

  protected wb;
  protected ws;

  constructor(protected args: any) {
    this.wb = new xl.Workbook({
      defaultFont: {
        name: 'Times New Roman'
      }
    });
    this.ws = this.wb.addWorksheet('Лист');
    this.formData()
  }

  async toBuffer(): Promise<Buffer> {
    const buffer: Buffer = await this.wb.writeToBuffer();
    return buffer;
  }

  protected formData() {

  }
}
