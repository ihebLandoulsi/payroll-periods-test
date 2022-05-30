import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreatePeriodeDto } from '../dto/create-periode.dto';
import { UpdatePeriodeDto } from '../dto/update-periode.dto';
import { Periode } from '../entities/periode.entity';

export abstract class PeriodeService {
  constructor(protected repository: Repository<Periode>) {}

  async create(createPeriodeDto: CreatePeriodeDto) {
    const periode = this.repository.create({
      ...createPeriodeDto,
    });
    try {
      await this.repository.save(periode);
    } catch (e) {
      console.log(e);
      throw new ConflictException('An erreur occured, try again later !');
    }
    return periode;
  }

  async findAll() {
    return await this.repository.find();
  }

  async findOne(id: string) {
    return await this.repository.findOne({ id });
  }

  async update(id: string, updatePeriodeDto: UpdatePeriodeDto) {
    const periode = await this.repository.findOne({ id });
    if (!periode) throw new ConflictException(' Periode not found: wrong ID !');
    const startDate = updatePeriodeDto.startDate
      ? updatePeriodeDto.startDate
      : periode.startDate;
    const endDate = updatePeriodeDto.endDate
      ? updatePeriodeDto.endDate
      : periode.endDate;
    this.verifyDtoCoherency({ startDate, endDate });
    for (const k in updatePeriodeDto) {
      periode[k] = updatePeriodeDto[k];
    }
    try {
      await this.repository.save(periode);
    } catch (e) {
      throw new ConflictException('An erreur occured, try again later !');
    }
    return periode;
  }

  async remove(id: string) {
    return this.repository.softRemove({ id });
  }

  verifyDtoCoherency(createPeriodeDto: CreatePeriodeDto): boolean {
    const startDate = createPeriodeDto.startDate;
    const endDate = createPeriodeDto.endDate;
    if (startDate > endDate)
      throw new ConflictException(
        'incoherent periode: startDate must be older than endDate !',
      );
    return true;
  }
}
