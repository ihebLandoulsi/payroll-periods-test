import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PeriodeService } from '../services/periode.service';
import { CreatePeriodeDto } from '../dto/create-periode.dto';
import { UpdatePeriodeDto } from '../dto/update-periode.dto';

export abstract class PeriodeController {
  constructor(private readonly periodeService: PeriodeService) {}

  @Post()
  create(@Body() createPeriodeDto: CreatePeriodeDto) {
    return this.periodeService.create(createPeriodeDto);
  }

  @Get()
  findAll() {
    return this.periodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.periodeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeriodeDto: UpdatePeriodeDto) {
    return this.periodeService.update(id, updatePeriodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.periodeService.remove(id);
  }
}
