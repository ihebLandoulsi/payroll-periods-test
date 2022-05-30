import { ConflictException, Injectable } from '@nestjs/common';
import { PeriodeService } from '../periode.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodeConges } from 'src/periode/entities/periodeConges.entity';
import { PeriodeCongesRepository } from 'src/periode/repositories/periodeConges.repository';
import { PeriodeMensuelle } from 'src/periode/entities/PeriodeMensuelle.entity';
import { CustomDateOperations } from 'src/utils/customDateOperations';
import { CreatePeriodeDto } from 'src/periode/dto/create-periode.dto';

@Injectable()
export class PeriodeCongesService extends PeriodeService {
  constructor(
    @InjectRepository(PeriodeConges)
    repository: PeriodeCongesRepository,
  ) {
    super(repository);
  }
  
  async bulk(listPeriodesDto: CreatePeriodeDto[]| PeriodeConges[]) {
    const listPeriodes = []
    listPeriodesDto.forEach(createPeriodeDto => {
      const periode = this.repository.create({
        ...createPeriodeDto,
      });
      listPeriodes.push(periode);
    });
    try {
      await this.repository.save(listPeriodes);
    } catch (e) {
      console.log(e);
      throw new ConflictException('An erreur occured, try again later !');
    }
    return listPeriodes;
  }

  /**
   * verifies if periodeConges in fully contained inside a PeriodeMensuelle
   * @param periodeConges the PeriodeConges we want to verify
   * @param periodeMensuelle the PeriodeMensuelle that should contain periodeConges
   */
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

  /**
   * verifies if we should generate multiple PeriodeConges that partition 
   * the paramater so that each partition is fully contained inside a PeriodeMensuelle
   * @param periodeConges the PeriodeConges we want to verify
   */
  shouldPeriodeCongesBepartitioned(periodeConges: PeriodeConges): boolean {
    const month = periodeConges.startDate.getUTCMonth();
    const year = periodeConges.startDate.getUTCFullYear();
    let periodeMensuelle = PeriodeMensuelle.fromYearMonth(year, month);
    return !this.checkPeriodeCongesInsideMensuelle(periodeConges, periodeMensuelle);
  }

  /**
   * generatees a list of PeriodeConges that partitions the passed paramater so
   * that each item of the list is fully contained inside a PeriodeMensuelle
   * @param periodeConges the initial periodeConges that will be partitioned
   */
  generatePeriodeCongesPerMensuelle(
    periodeConges: PeriodeConges,
  ): PeriodeConges[] {
    const month = periodeConges.startDate.getUTCMonth();
    const year = periodeConges.startDate.getUTCFullYear();
    const listPeriodeConges = [];
    let periodeMensuelle = PeriodeMensuelle.fromYearMonth(year, month);
    let currentPeriode = periodeConges;
    // partitioning the PeriodeConges into multiple PeriodeConges per PeriodeMensuelle
    while (
      !this.checkPeriodeCongesInsideMensuelle(currentPeriode, periodeMensuelle)
    ) {
      let generatedPerideConges = new PeriodeConges();
      const startDate = currentPeriode.startDate;
      generatedPerideConges.startDate = new Date(startDate.valueOf());
      generatedPerideConges.endDate = CustomDateOperations.lastDayOfThatMonth(
        startDate,
      );
      listPeriodeConges.push(generatedPerideConges);
      periodeMensuelle = periodeMensuelle.nextPeriodeMensuelle();
      currentPeriode.startDate = periodeMensuelle.startDate;
    }
    listPeriodeConges.push(currentPeriode);
    return listPeriodeConges;
  }
}
