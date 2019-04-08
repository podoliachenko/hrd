import { ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Model } from 'mongoose';
import { Logger } from '../schemas/logger.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import * as _ from 'lodash';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(@InjectModel('Logger') private readonly logger: Model<Logger>) {}

  intercept(
    context: ExecutionContext,
    call$: Observable<any>
  ): Observable<any> | Promise<Observable<any>> {
    const args: any = context.getArgByIndex(0);
    const user: User = args.params.profileWithDB;
    const params = _.omit(args.params, ['profileWithDB']);
    return call$.pipe(
      map(value => {
        const log = {
          userId: user._id,
          method: args.method,
          url: args._parsedUrl.pathname,
          params,
          body: args.body,
          query: args.query,
          status: args.method === 'POST' ? 201 : 200,
          date: new Date(),
          message: 'ok'
        } as Logger;
        this.logger.insertMany(log);
        return value;
      }),
      catchError(err => {
        const log = {
          userId: user._id,
          method: args.method,
          url: args._parsedUrl.pathname,
          params,
          body: args.body,
          stack: err.stack,
          query: args.query,
          status: err.status,
          date: new Date(),
          message: err.message
        } as Logger;
        this.logger.insertMany(log);
        throw err;
      })
    );
  }
}
