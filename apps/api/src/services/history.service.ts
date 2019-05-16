import { Injectable } from '@nestjs/common';
import { LoggerDB } from '../schemas/logger.schema';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HistoryService {
  constructor(@InjectModel('LoggerDB') private readonly logger: Model<LoggerDB>,
              @InjectModel('User') private readonly users: Model<User>) {
  }

  async getLogsByTargetIds(ids: string[]) {
    return await this.logger.aggregate([
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
        '$project': {
          'user': {
            'token': false
          }
        }
      }, {
        '$sort': {
          'date': -1
        }
      }
    ]);

  }

}
