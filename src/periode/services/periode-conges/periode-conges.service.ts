import { Injectable } from '@nestjs/common';
import { PeriodeService } from '../periode.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodeConges } from 'src/periode/entities/periodeConges.entity';
import { PeriodeCongesRepository } from 'src/periode/repositories/periodeConges.repository';

@Injectable()
export class PeriodeCongesService extends PeriodeService {
  constructor(
    @InjectRepository(PeriodeConges)
    repository: PeriodeCongesRepository,
  ) {
    super(repository);
  }
}
