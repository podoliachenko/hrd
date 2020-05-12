import { Component, Input, OnInit } from '@angular/core';
import { Log } from '@libs/api-interface/src';
import { LogHeader } from '@interfaces/dictionary';
import * as moment from 'moment';

@Component({
  selector: 'hrd-dictionary-logs',
  templateUrl: './dictionary-logs.component.html',
  styleUrls: ['./dictionary-logs.component.css']
})
export class DictionaryLogsComponent implements OnInit {
  @Input() logs: Log[];

  private types = {
    PATCH: 'Изменение'
  };

  constructor() {
  }

  ngOnInit() {
  }

  getHeader(log: Log): LogHeader {
    if (
      log.url.match(new RegExp('/dictionary/hide/*')) &&
      log.method === 'PATCH'
    ) {
      return {
        id: log.targetId,
        type: 'CONST.VISIBILITY',
        date: moment(log.date).format('DD.MM.YYYY hh:mm:ss'),
        user: log.user.fullName
      };
    }
    if (log.url.match(new RegExp('/dictionary/*')) && log.method === 'PATCH') {
      return {
        id: log.targetId,
        type: 'CONST.EDITING',
        date: moment(log.date).format('DD.MM.YYYY hh:mm:ss'),
        user: log.user.fullName
      };
    }
    if (log.url.match(new RegExp('/dictionary')) && log.method === 'POST') {
      return {
        id: log.targetId,
        type: 'CONST.MAKING',
        date: moment(log.date).format('DD.MM.YYYY hh:mm:ss'),
        user: log.user.fullName
      };
    }
    return {
      id: log.targetId,
      type: `${log.method} ${log.url}`,
      date: moment(log.date).format('DD.MM.YYYY hh:mm:ss'),
      user: log.user.fullName
    };
  }

  getContent(log: Log) {
    if (
      log.url.match(new RegExp('/dictionary/hide/*')) &&
      log.method === 'PATCH'
    ) {
      return [
        {
          label: 'CONST.VISIBILITY',
          value: log.body.hide ? 'CONST.HIDDEN' : 'CONST.SHOWN',
          translateLabel: true,
          translateValue: true
        }
      ];
    }
    if (
      log.url.match(new RegExp('/dictionary/*')) &&
      log.method === 'PATCH'
    ) {
      return [{
        label: 'CONST.NAME', value: log.body.label, translateLabel: true
      }];
    }
    if (log.url.match(new RegExp('/dictionary')) && log.method === 'POST') {
      return [{
        label: 'CONST.NAME', value: log.body.label, translateLabel: true
      }];
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
