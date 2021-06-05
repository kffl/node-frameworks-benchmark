import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, MinLength } from 'class-validator';

export class ValidationDto {
  @IsInt()
  @Type(() => Number)
  number: number;

  @IsNotEmpty()
  @MinLength(5)
  string: string;
}