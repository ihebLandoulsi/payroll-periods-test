import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PeriodeMensuelleDto } from 'src/periode/dto/create-periode-mensuelle.dto';
import { PeriodeMensuelleService } from 'src/periode/services/periode-mensuelle/periode-mensuelle.service';
import { CustomDateOperations } from 'src/utils/customDateOperations';

@Controller('periode/mensuelle')
export class PeriodeMensuelleController {
  constructor(private readonly service: PeriodeMensuelleService) {}
  @Post()
  create(@Body() periodeMensuelleDto: PeriodeMensuelleDto) {
    const createPeriodeDto = this.transform(periodeMensuelleDto);
    return this.service.create(createPeriodeDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() periodeDto: PeriodeMensuelleDto) {
    const updatePeriodeDto = this.transform(periodeDto);
    return this.service.update(id, updatePeriodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  //TODO: transform this method to a pipe
  private transform(periodeMensuelleDto: PeriodeMensuelleDto) {
    const year = periodeMensuelleDto.year;
    const month = periodeMensuelleDto.month;
    const startDate = new Date(
      Date.UTC(periodeMensuelleDto.year, periodeMensuelleDto.month),
    );
    return {
      startDate: startDate,
      endDate: CustomDateOperations.lastDayOfThatMonth(startDate),
    };
  }
}
