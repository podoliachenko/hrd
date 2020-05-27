import { Controller, Get, Header, HttpException, Res } from '@nestjs/common';
import { Level } from '../decorators/level.decorator';
import { InjectModel } from '@nestjs/mongoose';
import { LoggerDB } from '../schemas/logger.schema';
import { Model } from 'mongoose';
import { UserService } from '../services/user.service';
import { GroupListExport } from '../export/GroupListExport';
import { Response } from 'express';

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

  @Get('xlsx')
  @Level(0)
  @Header('Content-Disposition', 'attachment; filename=file.xlsx')
  async xlsx(@Res() res: Response) {
    const exp = new GroupListExport({})
    const buffer = await exp.toBuffer();
    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet').send(buffer)

  }

  @Get('test')
  @Level(0)
  test() {
    return 'ok';
  }


}
