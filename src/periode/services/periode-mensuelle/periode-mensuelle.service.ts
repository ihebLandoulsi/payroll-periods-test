import { Injectable } from '@nestjs/common';
import { PeriodeService } from '../periode.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodeMensuelle } from 'src/periode/entities/PeriodeMensuelle.entity';
import { PeriodeMensuelleRepository } from 'src/periode/repositories/periodeMensuelle.repository';

@Injectable()
export class PeriodeMensuelleService extends PeriodeService {
  constructor(
    @InjectRepository(PeriodeMensuelle)
    repository: PeriodeMensuelleRepository,
  ) {
    super(repository);
  }
}
