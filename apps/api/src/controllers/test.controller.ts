import { Controller, Get, HttpException } from '@nestjs/common';
import { Level } from '../decorators/level.decorator';

@Controller()
export class TestController {
  constructor() {}
  @Get()
  @Level(0)
  async get() {
    return new Promise((resolve, reject) => {
      reject(new HttpException('test', 403));
    });
  }
}
