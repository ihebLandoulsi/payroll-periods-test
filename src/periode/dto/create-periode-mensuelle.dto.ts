import { IsNumber, Max, Min } from "class-validator";
import {  } from "class-validator";

export class PeriodeMensuelleDto {
  @IsNumber()
  @Min(0)
  @Max(12)
  month: number;

  @IsNumber()
  @Min(1900)
  @Max(2100)
  year: number;
}