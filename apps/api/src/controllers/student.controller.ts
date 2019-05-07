import {
  Get,
  Controller,
  Post,
  Res,
  HttpStatus,
  Query,
  HttpException,
  Delete,
  Patch
} from '@nestjs/common';
import { StudentService } from '../services/student.service';
import {
  Body,
  Param
} from '@nestjs/common/decorators/http/route-params.decorator';
import { Level } from '../decorators/level.decorator';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  PagesParam,
  PagesQuery,
  StudentParam
} from '../Interfaces/StudentsController/StudentsController';
import { LogTarget } from '../decorators/logtarget.decorator';

@ApiUseTags('student')
@Controller('student')
export class StudentController {
  constructor(private readonly appService: StudentService) {}

  @ApiOperation({ title: 'Получить студента по id' })
  @Get(':id')
  @Level(1)
  getStudent(@Param() params: StudentParam) {
    return this.appService.getStudent(params.id);
  }

  @ApiOperation({ title: 'Получит указанную страницу списка студентов' })
  @Get('page/:page')
  @Level(1)
  async getPage(
    @Param() params: PagesParam,
    @Query() query: PagesQuery
  ): Promise<any> {
    if (params.page < 1) {
      throw new HttpException({}, 404);
    }
    if (!query.max) {
      query.max = 10;
    }
    if (Number(query.max) < 1) {
      query.max = 10;
    }
    return await this.appService.getPage(
      params.page,
      Number(query.max),
      JSON.parse(query.filter),
      JSON.parse(query.sort)
    );
  }

  @ApiOperation({ title: 'Удаляет студента по id' })
  @Delete(':id')
  @Level(2)
  @LogTarget((_, args) => args.params.id)
  delete(@Param() params: StudentParam) {
    return this.appService.deleteStudent(params.id);
  }

  @ApiOperation({ title: 'Добавить студента' })
  @Post()
  @Level(2)
  @LogTarget(value => value[0]._id)
  post(@Body() body): any {
    return this.appService.addStudent(body);
  }

  @ApiOperation({ title: 'Изменить студента' })
  @Patch(':id')
  @Level(2)
  @LogTarget((_, args) => args.params.id)
  patch(@Body() body, @Param('id') id) {
    return this.appService.editStudent(id, body);
  }
}
