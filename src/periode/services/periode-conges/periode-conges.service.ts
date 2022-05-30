import { Injectable } from '@nestjs/common';
import { PeriodeService } from '../periode.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodeConges } from 'src/periode/entities/periodeConges.entity';
import { PeriodeCongesRepository } from 'src/periode/repositories/periodeConges.repository';
import { PeriodeMensuelle } from 'src/periode/entities/PeriodeMensuelle.entity';

@Injectable()
export class PeriodeCongesService extends PeriodeService {
  constructor(
    @InjectRepository(PeriodeConges)
    repository: PeriodeCongesRepository,
  ) {
    super(repository);
  }

  checkPeriodeCongesInsideMensuelle(
    periodeConges: PeriodeConges,
    periodeMensuelle: PeriodeMensuelle,
  ): boolean {
    return (
      periodeConges.startDate >= periodeMensuelle.startDate &&
      periodeConges.endDate <= periodeMensuelle.endDate &&
      periodeConges.startDate <= periodeConges.endDate
    );
  }

  generateCongesPeriodePerMensuelle(periodeConges: PeriodeConges): PeriodeConges[] {
    throw new Error('method not implemented');
  }
}
