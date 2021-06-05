import { Module } from '@nestjs/common';
import { ErrorsController } from './errors.controller';

@Module({
  imports: [],
  controllers: [ErrorsController],
  providers: [],
})
export class ErrorsModule {}

