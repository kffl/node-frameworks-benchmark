import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

@Controller('/error')
export class ErrorsController {
  @Get(':id')
  getError(@Param('id', new ParseIntPipe()) val: number) {
    const x = val / (val - 1)
    if (!isFinite(x)) {
        throw new TypeError("Division by 0");
    }
    return {value: x}
  }
}

