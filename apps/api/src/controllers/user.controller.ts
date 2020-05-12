import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { Level } from '../decorators/level.decorator';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../schemas/user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private user: UserService) {
  }

  @Post('login')
  @Level(0)
  async login(@Body('userName') userName, @Body('password') password) {
    return this.user.login(userName, password);
  }

  @Level(1)
  @Patch('changeName')
  async updateAccount(@Param('profileWithDB') profile,
                      @Body('newName') name) {
    return this.user.updateNameUser(profile._id, name);
  }

  @Level(1)
  @Patch('changePassword')
  async changePassword(@Param('profileWithDB') profile, @Body('oldPassword') oldPassword, @Body('password') password) {
    return this.user.changePassword(profile._id, oldPassword, password);
  }
  @Level(4)
  @Post('updatePassword')
  async updatePassword(@Body('_id') _id,
                      @Body('password') password) {
    return this.user.updatePasswordUser(_id, password);
  }

  @Post('refreshToken')
  @Level(0)
  async refreshToken(@Body('refreshToken') refreshToken) {
    return this.user.refreshToken(refreshToken);
  }

  @Post('registration')
  @Level(0)
  async registration(@Body() user: User) {
    return this.user.registration(user);
  }

  @Get()
  @Level(3)
  async getUsers(): Promise<any> {
    return this.user.getUsers();
  }

  @Patch('/privilege')
  @Level(3)
  async changeLevel(@Body() body, @Param('profileWithDB') profile) {
    return this.user.changePrivilege(profile, body.level, body._id);
  }
  @Post('/newUser')
  @Level(3)
  async newUser(@Body() body) {
    return this.user.newUser(body);
  }
}
