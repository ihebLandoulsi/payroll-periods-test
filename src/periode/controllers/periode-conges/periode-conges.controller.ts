import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePeriodeDto } from 'src/periode/dto/create-periode.dto';
import { UpdatePeriodeDto } from 'src/periode/dto/update-periode.dto';
import { PeriodeConges } from 'src/periode/entities/periodeConges.entity';
import { PeriodeCongesService } from 'src/periode/services/periode-conges/periode-conges.service';
import { CustomDateOperations } from 'src/utils/customDateOperations';

@Controller('periode/conges')
export class PeriodeCongesController {
  constructor(private readonly service: PeriodeCongesService) {}
  @Post()
  create(@Body() createPeriodeDto: CreatePeriodeDto) {
    createPeriodeDto.startDate = new Date(createPeriodeDto.startDate);
    createPeriodeDto.endDate = new Date(createPeriodeDto.endDate);

    this.service.verifyDtoCoherency(createPeriodeDto);
    const periode = new PeriodeConges();
    periode.startDate = createPeriodeDto.startDate;
    periode.endDate = createPeriodeDto.endDate;
    

    if (this.service.shouldPeriodeCongesBepartitioned(periode)){
      const listPeriodes = this.service.generatePeriodeCongesPerMensuelle(periode);
      return this.service.bulk(listPeriodes);
    }

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
  update(@Param('id') id: string, @Body() updatePeriodeDto: UpdatePeriodeDto) {
    return this.service.update(id, updatePeriodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
