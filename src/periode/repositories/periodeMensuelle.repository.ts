import { EntityRepository, Repository } from 'typeorm';
import { PeriodeMensuelle } from '../entities/PeriodeMensuelle.entity';

@EntityRepository(PeriodeMensuelle)
export class PeriodeMensuelleRepository extends Repository<PeriodeMensuelle> {}