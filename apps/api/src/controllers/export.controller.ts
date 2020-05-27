import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Header, Param, Res } from '@nestjs/common';
import { StudentService } from '../services/student.service';
import { Level } from '../decorators/level.decorator';
import { GroupListExport } from '../export/GroupListExport';
import { Response } from 'express';

@ApiTags('export')
@Controller('export')
export class ExportController {

  constructor(private student: StudentService) {
  }

  @Get('groupList/:year/:group')
  @Level(1)
  @Header('Content-Disposition', 'attachment; filename=file.xlsx')
  async getGroupList(@Param('group') group, @Param('year') year, @Res() res: Response) {
    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      .send(await this.student.getGroupYearInFile(group, year))
  }

}
