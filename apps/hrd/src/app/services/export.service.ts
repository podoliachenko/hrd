import { Injectable } from '@angular/core';
import { HttpClient } from '@workspace/node_modules/@angular/common/http';
import { saveAs } from 'file-saver'

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(private http: HttpClient) {
  }

  exportGroupList(year: string, group: string) {
    this.http.get(`/export/groupList/${year}/${group}`, {responseType: 'blob'}).subscribe(value => {
      saveAs(value, `Група ${group}(${year}).xlsx`)
    });
  }
}
