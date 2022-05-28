import { EntityRepository, Repository } from 'typeorm';
import { PeriodeConges } from '../entities/periodeConges.entity';

@EntityRepository(PeriodeConges)
export class PeriodeCongesRepository extends Repository<PeriodeConges> {}