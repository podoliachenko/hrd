import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private auth: UserService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const level = this.reflector.get<number>('level', context.getHandler());

    if (level === undefined) {
      throw new HttpException('Privilege level not set', 403);
    }
    context.getArgByIndex(0).params.profileWithDB = await this.auth.checkAuth(
      context.getArgs()[0].headers,
      level
    );
    return true;
  }
}
