import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IStudent } from '../Interfaces/IStudent';
import { Student } from '../schemas/student.schema';
import { GroupListExport, GroupListExportParams } from '../export/GroupListExport';
import { Dictionary } from '../schemas/dictionary.schema';

@Injectable()
export class StudentService {
  constructor(@InjectModel('Student') private readonly student: Model<Student>,
              @InjectModel('Dictionary') private readonly dictionary: Model<Dictionary>) {
  }

  getAll() {
    return this.student.find({});
  }

  async getPage(page, max, filter = {}, sort = {}) {
    // @ts-ignore
    return await this.student.paginate<any, any>(this.regFilter(filter), {
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
    const student: Student = await this.student.findOne({ _id: id }).catch(() => {
      throw new HttpException('Student not found', 406);
    });
    if (student) {
      const result: any = {};
      result.student = student;
      result.classmates = await this.student.aggregate([
        {
          $addFields: { year: '$group_formation_year' }
        },
        {
          $match: {
            group: student.group,
            year: student.group_formation_year
          }
        }
      ]);
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

  async getGroupsOnYears(filter): Promise<any> {
    return this.student.aggregate([
      {
        $match: {
          group: new RegExp(filter)
        }
      },
      {
        $group: {
          _id: { year: '$group_formation_year', group: '$group' },
          students: {
            $addToSet: '$$ROOT'
          }
        }
      },
      { $sort: { '_id.group': 1 } },
      {
        $group: {
          _id: '$_id.year',
          groups: {
            $push: {
              students: '$students',
              group: '$_id.group'
            }
          }
        }
      },
      { $sort: { '_id': -1 } }
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

  async getGroupYear(name: string, year: string): Promise<any> {
    return this.student
      .aggregate([
        {
          $addFields: { year: '$group_formation_year' }
        },
        {
          $match: {
            group: name,
            year: year ? Number(year) : null
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

  initStudents() {

  }


  async getGroupYearInFile(name, year) {
    const group = await this.getGroupYear(name, year);
    const dictionary = await this.dictionary.find();
    console.log(group);
    console.log(dictionary);
    const firstStudent = group.students.filter(v => v.activity === 3)[0];
    const group_formation_year = new Date(firstStudent.group_formation_year,9,1);
    const course = (new Date()).getFullYear() - group_formation_year.getFullYear() + 1;

    const args: GroupListExportParams = {
      form_study: dictionary.find((v) => {
        return v.name === 'form_study' && v.value === firstStudent.form_study;
      }).label,
      department: `Відділення "${dictionary.find((v2) => {
        return v2.name === 'department' && v2.value === firstStudent.department;
      }).label}"`,
      group: `Група ${group.group}`,
      specialty: dictionary.find((v) => {
        return v.name === 'specialty' && v.value === firstStudent.specialty;
      }).label,
      course: `${this.toRoman(course)} курс`,
      students: group.students.filter(v => v.activity === 3).map(v => {
        return {
          full_name: `${v.last_name} ${v.first_name} ${v.patronymic}`,
          notes: v.notes,
          status: dictionary.find((v2) => {
            return v2.name === 'status' && v2.value === v.status;
          }).label,
          terms_training: dictionary.find((v2) => {
            return v2.name === 'terms_training' && v2.value === v.terms_training;
          }).label,
        }
      })
    };
    return await new GroupListExport(args).toBuffer();
  }
   toRoman(num) {
    const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
     const roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
     let result = '';

    for (let i = 0; i <= decimal.length; i++) {
      while (num % decimal[i] < num) {
        result =result+ roman[i];
        num =num-decimal[i];
      }
    }
    return result;
  }
}
