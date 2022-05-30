import { IsDateString } from "class-validator";

export class CreatePeriodeDto {
  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
