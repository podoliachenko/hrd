import { Get, Controller, Req, Patch, Body } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Level } from '../decorators/level.decorator';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(private user: UserService) {}

  @Get('authorization')
  @Level(0)
  async authorizationGet(@Req() req: any): Promise<any> {
    return this.user.getPrivilege(req.headers.id, req.headers.token);
  }

  @Get()
  @Level(3)
  async getUsers(): Promise<any> {
    return this.user.getUsers();
  }

  @Patch('/privilege')
  @Level(3)
  async changeLevel(@Body() body, @Req() req) {
    return this.user.changePrivilege(req.headers, body.level, body.id);
  }
}
