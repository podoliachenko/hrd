import { Get, Controller, Req, Param, Patch, Body } from '@nestjs/common';
import { Level } from '../decorators/level.decorator';
import { StudentService } from '../services/student.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(private student: StudentService) {
  }

  @Get()
  @Level(1)
  async get(): Promise<any> {
    return this.student.getGroups();
  }

  @Get(':group')
  @Level(1)
  async getGroup(@Param('group') group) {
    return this.student.getGroup(group);
  }
}
