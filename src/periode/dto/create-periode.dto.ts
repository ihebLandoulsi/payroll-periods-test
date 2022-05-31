import { ApiProperty } from "@nestjs/swagger";
import { IsDateString } from "class-validator";

export class CreatePeriodeDto {
  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  endDate: Date;
}
