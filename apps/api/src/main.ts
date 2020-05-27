import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { environment } from './environments/environment';
import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { GroupListExport } from './export/GroupListExport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('Документация')
    .setDescription('API сервера')
    .setVersion(environment.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // SwaggerModule.setup('api', app, document);

  await app.listen(process.env.port || 3000);
  Logger.log(environment.version, 'Версия');
  Logger.log(process.env.port || 3000, 'Порт');

  fs.writeFileSync('./file.xlsx', await (new GroupListExport({course: '0', specialty: '0', group: '0', status: '0'}).toBuffer()), {encoding: 'binary'})
  Logger.debug('Файл собран')

}

bootstrap();
