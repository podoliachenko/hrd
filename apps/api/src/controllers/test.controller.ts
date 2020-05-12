import { Controller, Get, HttpException } from '@nestjs/common';
import { Level } from '../decorators/level.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerDB } from '../schemas/logger.schema';
import { Model } from 'mongoose';
import { UserService } from '../services/user.service';

@Controller()
export class TestController {
  constructor(
    @InjectModel('LoggerDB') private readonly logger: Model<LoggerDB>,
    @InjectModel('Student') private readonly student: Model<any>,
    private userService: UserService
  ) {
  }

  @Get()
  @Level(0)
  async get() {
    throw new HttpException('test ok', 200);
  }

  @Get('test')
  @Level(0)
  test() {
    return 'ok';
  }


}
