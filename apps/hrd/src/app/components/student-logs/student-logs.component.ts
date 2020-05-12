import { Component, Input, OnInit } from '@angular/core';
import { Log } from '@libs/api-interface/src';
import { LogHeader } from '@interfaces/dictionary';
import * as moment from 'moment';
import { student_fields } from '@configs/student_fields';

@Component({
  selector: 'hrd-student-logs',
  templateUrl: './student-logs.component.html',
  styleUrls: ['./student-logs.component.css']
})
export class StudentLogsComponent implements OnInit {

  @Input() logs: Log[];

  constructor() {
  }

  ngOnInit() {
  }

  getHeader(log: Log): LogHeader {
    const val = {
      id: log.targetId,
      type: `${log.method} ${log.url}`,
      date: moment(log.date).format('DD.MM.YYYY hh:mm:ss'),
      user: log.user.fullName
    };

    if (log.method === 'POST' && log.url.match(new RegExp('/student'))) {
      val.type = 'CONST.MAKING';
    }
    if (log.method === 'PATCH' && log.url.match(new RegExp('/student/*'))) {
      val.type = 'CONST.EDITING';
    }

    return val;
  }

  getContent(log: Log) {

    if (log.method === 'POST' && log.url.match(new RegExp('/student')) ||
      log.method === 'PATCH' && log.url.match(new RegExp('/student/*'))) {
      const bodyKeys = Object.keys(log.body);
      const content = [];
      for (const bodyKey of bodyKeys) {
        content.push({
          label: 'FIELD_LABELS.' + bodyKey,
          value: log.body[bodyKey],
          translateLabel: true,
          stringifyValue: true,
          colInfo: student_fields.find(v => v.field === bodyKey)
        });
      }
      return content;
    }

    return [
      {
        label: 'params',
        value: JSON.stringify(log.params)
      },
      {
        label: 'body',
        value: JSON.stringify(log.body)
      },
      {
        label: 'query',
        value: JSON.stringify(log.query)
      }
    ];
  }
}
