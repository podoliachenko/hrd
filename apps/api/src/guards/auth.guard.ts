import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private jwtService: JwtService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const level = this.reflector.get<number>('level', context.getHandler());

    if (level === undefined) {
      throw new HttpException('Privilege level not set', 403);
    }
    if (level === 0) {
      return true;
    }
    try {
      const decodedToken = this.jwtService.verify(context.getArgs()[0].headers.token);
      context.getArgByIndex(0).params.profileWithDB = decodedToken;
      if (decodedToken.privilege >= level) {
        return true;
      } else {
        throw new HttpException('Low level privilege', 403);
      }
    } catch (e) {
      throw new HttpException('JWT expired', 401);
    }
    return true;
  }
}
