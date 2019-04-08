import { Get, Controller, Req, Param } from '@nestjs/common';
import { Level } from '../decorators/level.decorator';
import { StudentService } from '../services/student.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('groups')
@Controller('groups')
export class GroupController {
  constructor(private student: StudentService) {}

  @Get()
  @Level(1)
  async get(@Req() req: any): Promise<any> {
    return this.student.getGroups();
  }

  @Get(':group')
  @Level(1)
  async getGroup(@Param() params) {
    return this.student.getGroup(params.group);
  }
}
