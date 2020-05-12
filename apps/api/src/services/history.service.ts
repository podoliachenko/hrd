import { Injectable } from '@nestjs/common';
import { LoggerDB } from '../schemas/logger.schema';
import { toPublicUser, User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HistoryService {
  constructor(@InjectModel('LoggerDB') private readonly logger: Model<LoggerDB>,
              @InjectModel('User') private readonly users: Model<User>) {
  }

  async getLogsByTargetIds(ids: string[]) {
    return this.logger.aggregate([
      {
        '$match': {
          'targetId': {
            '$in': ids
          }
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'userId',
          'foreignField': '_id',
          'as': 'user'
        }
      }, {
        '$sort': {
          'date': -1
        }
      }
    ]).then((v: any[]) => {
      for (const v2 of v) {
        v2.user = toPublicUser(v2.user[0]);
      }
      return v;
    });

  }

}
