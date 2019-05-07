import { Controller, Get, HttpException } from '@nestjs/common';
import { Level } from '../decorators/level.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerDB } from '../schemas/logger.schema';
import { Model } from 'mongoose';

@Controller()
export class TestController {
  constructor(
    @InjectModel('LoggerDB') private readonly logger: Model<LoggerDB>,
    @InjectModel('Student') private readonly student: Model<any>
  ) {
  }

  @Get()
  @Level(0)
  async get() {
    throw new HttpException('test ok', 200);
  }

  @Get('old')
  @Level(0)
  async old() {
    const els = await this.logger.find();
    els.forEach(async el => {
      if (el.targetId) {
      } else {
        if (el.url.startsWith('/student')) {
          if (el.method === 'POST') {
            const st = await this.student.findOne({
              first_name: el.body.first_name,
              last_name: el.body.last_name,
              group: el.body.group
            });
            if (st) {
              await this.logger.updateOne({ _id: el._id }, { targetId: st._id });
              console.log('changed ', st.first_name, st.last_name);
            }
          }
        }
      }
    });
  }
}
