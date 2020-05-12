import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly user: Model<User>,
              private jwtService: JwtService) {
  }

  async registration(user: User) {
    const userModel = new this.user(user);
    return userModel.save();
  }


  async changePrivilege(profile, lvl, targetUserId) {

    const currUser: User = await this.user.findById(profile._id);
    if (currUser.privilege <= lvl) {
      throw new HttpException('Not enough privileges', 403);
    }

    const targetUser = await this.user.findOne({ _id: targetUserId });

    if (currUser.privilege > targetUser.privilege) {
      return this.user.updateOne({ _id: targetUser._id }, { privilege: lvl });
    } else {
      throw new HttpException('Not enough privileges', 403);
    }
  }

  async getUsers() {
    return this.user.find({}).then(res => {
      return res.map(value => {
        const result: any = {};
        result._id = value._id;
        result.userName = value.userName;
        result.fullName = value.fullName;
        result.privilege = value.privilege;
        result.email = value.email;
        result.full_name = value.full_name;
        return result;
      });
    });
  }

  async login(userName: string, password: string) {
    const user = await this.user.findOne({ userName });
    if (!user || user.password !== password) {
      throw new HttpException('Invalid username or password', 401);
    }
    const refreshToken = this.generateRefreshToken({ id: user._id });
    await this.saveRefreshToken(refreshToken);

    return {
      token: this.generateAccessToken(user.toObject()),
      refreshToken
    };
  }

  private generateRefreshToken(payload) {
    console.log(payload);
    const s = this.jwtService.sign(payload, { expiresIn: '30d' });
    console.log(s);
    return s;
  }

  private generateAccessToken(payload) {
    return this.jwtService.sign({
      _id: payload._id,
      userName: payload.userName,
      fullName: payload.fullName,
      privilege: payload.privilege
    });
  }

  private async saveRefreshToken(refreshToken) {
    const decodedToken: any = this.jwtService.decode(refreshToken);
    console.log(decodedToken);
    return this.user.updateOne({ _id: decodedToken.id }, {
      $set: { refreshToken: refreshToken }
    });
  }

  async refreshToken(refreshToken) {
    try {
      const decodedToken: any = this.jwtService.verify(refreshToken);
      const user = await this.user.findById(decodedToken.id);
      console.log(user);
      console.log(user.refreshToken === refreshToken, user.refreshToken, refreshToken);
      if (user.refreshToken !== refreshToken) {
        throw new HttpException('JWT expired', 401);
      }

      const newRefreshToken = this.generateRefreshToken({ id: user._id });
      const newAccessToken = this.generateAccessToken(user.toObject());
      await this.saveRefreshToken(newRefreshToken);

      return {
        token: newAccessToken,
        refreshToken: newRefreshToken
      };

    } catch (e) {
      console.log(e);
      throw new HttpException('JWT expired', 401);
    }
  }

  async updatePasswordUser(_id: any, password: any) {
    const user = await this.user.findById(_id);
    await this.user.updateOne({ _id }, {
      $set: {
        userName: user.email,
        fullName: user.full_name,
        password,
        id: null,
        full_name: null,
        email: null,
        token: null,
        img: null
      }
    });
  }

  async newUser(user) {
    const userExist = await this.user.findOne({ userName: user.login });
    if (userExist) {
      throw  new HttpException('Current username exist', 403);
    }
    return this.user.insertMany([{
      userName: user.login,
      fullName: user.name,
      password: user.password,
      privilege: user.privilege
    }]);
  }

  async changePassword(_id, oldPassword: any, password: any) {
    const user = await this.user.findById(_id);
    if (oldPassword !== user.password) {
      throw new HttpException('Current password is incorrect', 401);
    }
    return this.user.updateOne({ _id }, {
      $set: {
        password
      }
    });
  }

  updateNameUser(_id: any, fullName: any) {
    return this.user.updateOne({ _id }, {
      $set: {
        fullName
      }
    });
  }
}
