import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ErrorsModule } from './errors/errors.module';

@Module({
  imports: [RedisModule.register({url: 'redis://127.0.0.1:6379'}), ErrorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
