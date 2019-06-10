import { Get, Controller, Req, Param, Patch, Body, Query } from '@nestjs/common';
import { Level } from '../decorators/level.decorator';
import { StudentService } from '../services/student.service';
import { ApiOperation, ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private student: StudentService) {
  }

  @Get()
  @ApiOperation({ deprecated: true, title: 'Получить список групп' })
  @Level(1)
  async get(): Promise<any> {
    return this.student.getGroups();
  }

  @Get('on-years')
  @ApiOperation({ title: 'Получить список групп по годам' })
  @Level(1)
  async getOnYears(@Query('filter') filter = ''): Promise<any> {
    console.log(filter)
    return this.student.getGroupsOnYears(filter);
  }

  @Get(':group')
  @ApiOperation({ title: 'Получить список студентов группы', deprecated: true })
  @Level(1)
  async getGroup(@Param('group') group) {
    return this.student.getGroup(group);
  }

  @Get('null/:group')
  @ApiOperation({ title: 'Получить список студентов группы', deprecated: true })
  @Level(1)
  async getGroupYearNull(@Param('group') group) {
    return this.student.getGroupYear(group, null);
  }

  @Get(':year/:group')
  @ApiOperation({ title: 'Получить список студентов группы', deprecated: true })
  @Level(1)
  async getGroupYear(@Param('group') group, @Param('year') year) {
    return this.student.getGroupYear(group, year);
  }
}
