import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from '../Interfaces/IStudent';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private readonly student: Model<any>) {
  }

  getAll() {
    return this.student.find({});
  }

  async getPage(page, max, filter = {}, sort = {}) {
    return await this.student.paginate(this.regFilter(filter), {
      sort,
      limit: 10,
      page
    });
  }

  regFilter(filter) {
    const val: any = {};
    Object.keys(filter).forEach(value => {
      if (typeof filter[value] === 'number') {
        val[value] = filter[value];
      } else if (this.isDate(filter[value])) {
        val[value] = filter[value];
      } else {
        val[value] = { $regex: filter[value] };
      }
    });
    return val;
  }

  addStudent(student: IStudent) {
    return this.student.insertMany(student);
  }

  deleteStudent(id: string) {
    return this.student.deleteOne({ _id: id });
  }

  async getStudent(id) {
    const student = await this.student.findOne({ _id: id }).catch(() => {
      throw new HttpException('Student not found', 406);
    });
    if (student) {
      const result: any = {};
      result.student = student;
      result.classmates = await this.student.find({ group: student.group });
      return result;
    } else {
      throw new HttpException('Student not found', 406);
    }
  }

  async getGroups(): Promise<any> {
    return this.student.aggregate([
      {
        $group: {
          _id: '$group',
          students: {
            $addToSet: '$_id'
          }
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            group: '$_id',
            docs: '$students'
          }
        }
      }
    ]);
  }

  async getGroup(name: string): Promise<any> {
    return this.student
      .aggregate([
        {
          $match: {
            group: name
          }
        },
        {
          $sort: {
            last_name: 1
          }
        },
        {
          $group: {
            _id: '$group',
            students: {
              $push: '$$ROOT'
            }
          }
        },
        {
          $replaceRoot: {
            newRoot: {
              group: '$_id',
              students: '$students'
            }
          }
        }
      ])
      .then(val => val[0]);
  }

  editStudent(id: any, body: any) {
    return this.student.updateOne({ _id: id }, body);
  }

  isDate(_date) {
    const _regExp = new RegExp('^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$');
    return _regExp.test(_date);
  }
}
