import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Max, Min } from "class-validator";

export class PeriodeMensuelleDto {
  @ApiProperty({
    maximum:12,
    minimum:1,
    example:9
  })
  @IsNumber()
  @Min(0)
  @Max(12)
  month: number;

  @ApiProperty({
    maximum:2100,
    minimum:1900,
    example:1998
  })
  @IsNumber()
  @Min(1900)
  @Max(2100)
  year: number;
}