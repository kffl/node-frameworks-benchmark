import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //const app = await NestFactory.create(AppModule, {logger: ['error', 'warn', 'debug']});
  app.use(morgan('combined'))
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
