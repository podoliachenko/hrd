import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import { LoginTicket } from 'google-auth-library/build/src/auth/loginticket';
import { User } from '../schemas/user.schema';

@Injectable()
export class UserService {
  oAuth2: OAuth2Client;
  audience =
    '955712266139-p02inm3kua8ugl2mq5clsovi1juhgq0g.apps.googleusercontent.com';

  constructor(@InjectModel('User') private readonly user: Model<User>) {
    this.oAuth2 = new OAuth2Client(this.audience);
  }

  async getPrivilege(id, idToken) {
    // поиск пользователя
    const res = await this.user.find({ id });
    // если его нет или токен не действителен выполнить проверку токена
    if (res.length === 0 || res[0].token !== idToken) {
      const value = await this.oAuth2
        .verifyIdToken({ idToken, audience: this.audience })
        .catch(() => {
          throw new HttpException('Authorization failed', 403);
        });
      return (await this.createOrUpdate(res, value, idToken, id))[0];
    } else {
      return await res[0];
    }
  }

  createOrUpdate(
    users: User[],
    gval: LoginTicket,
    token: string,
    id
  ): Promise<any> {
    const payload = gval.getPayload();
    if (users.length === 0 && id === payload.sub) {
      return this.user.insertMany([
        {
          id: payload.sub,
          full_name: payload.given_name + ' ' + payload.family_name,
          email: payload.email,
          privilege: 0,
          token,
          img: payload.picture
        } as User
      ]);
    } else if (id === payload.sub && users[0].id === payload.sub) {
      return this.user
        .updateOne(
          { id: payload.sub },
          {
            token,
            full_name: payload.given_name + ' ' + payload.family_name,
            img: payload.picture
          }
        )
        .exec()
        .then(() => {
          users[0] = Object.assign(users[0], {
            token,
            full_name: payload.given_name + ' ' + payload.family_name,
            img: payload.picture
          });
          return users;
        });
    } else {
      throw new HttpException('Authorization failed', 403);
    }
  }

  async checkAuth(res, level: number): Promise<any> {
    return this.getPrivilege(res.id, res.token).then((value: User) => {
      if (value.privilege >= level) {
        return value;
      } else {
        throw new HttpException('Low level privilege', 403);
      }
    });
  }

  async changePrivilege(res, lvl, targetUser) {
    const currUser: User = await this.user.findOne({ id: res.id });
    if (currUser.privilege <= lvl) {
      throw new HttpException('Not enough privileges', 403);
    }

    targetUser = await this.user.findOne({ id: targetUser });

    if (currUser.privilege > targetUser.privilege) {
      return this.user.updateOne({ id: targetUser.id }, { privilege: lvl });
    } else {
      throw new HttpException('Not enough privileges', 403);
    }
  }

  async getUsers() {
    return this.user.find({}).then(res => {
      return res.map(value => {
        value.token = undefined;
        return value;
      });
    });
  }
}
