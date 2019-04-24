import { Module } from '@nestjs/common';
import { StudentService } from './services/student.service';
import { StudentController } from './controllers/student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './schemas/student.schema';
import { UserController } from './controllers/user.controller';
import { UserSchema } from './schemas/user.schema';
import { UserService } from './services/user.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { GroupController } from './controllers/group.controller';
import { TestController } from './controllers/test.controller';
import { LoggerInterceptor } from './interceptor/LoggerInterceptor';
import { LoggerSchema } from './schemas/logger.schema';
import { DictionarySchema } from './schemas/dictionary.schema';
import { DictionaryController } from './controllers/dictionary.controller';
import { environment } from './environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongodb, {
      useNewUrlParser: true
    }),
    MongooseModule.forFeature([
      {
        name: 'Student',
        schema: StudentSchema
      },
      {
        name: 'User',
        schema: UserSchema
      },
      {
        name: 'LoggerDB',
        schema: LoggerSchema
      },
      {
        name: 'Dictionary',
        schema: DictionarySchema
      }
    ])
  ],
  controllers: [
    StudentController,
    UserController,
    GroupController,
    TestController,
    DictionaryController
  ],
  providers: [
    StudentService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    }
  ]
})
export class AppModule {
}
