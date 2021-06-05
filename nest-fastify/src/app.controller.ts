import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ValidationDto } from './dto/validation.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/static')
  getStatic() {
    return this.appService.getStatic();
  }

  @Get('/fib')
  getFibonacci() {
    return {res: this.appService.fibo(23)};
  }

  @Get('/redis')
  async getRedis() {
    return {value: await this.appService.getRedis()}
  }

  @Get('/validation')
  getValidation(@Query() validationDto: ValidationDto) {
    return {ok: true}
  }
}
