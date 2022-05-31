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
  
  /**
   * Save a list of PeriodeConges in the Database.
   * @param listPeriodesDto the list of periodes to be saved in Database.
   */
  async bulk(listPeriodesDto: CreatePeriodeDto[] | PeriodeConges[]) {
    const listPeriodes = [];

    //fill the list of Periodes with generated attributes such as id and createdAt...
    listPeriodesDto.forEach(createPeriodeDto => {
      const periode = this.repository.create({
        ...createPeriodeDto,
      });
      listPeriodes.push(periode);
    });

    //save in database
    try {
      await this.repository.save(listPeriodes);
    } catch (e) {
      console.log(e);
      throw new ConflictException('An erreur occured during the connection with database.');
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
    // generating a PeriodeMensuelle that represents the month of the startDate of PeriodeConges
    const month = periodeConges.startDate.getUTCMonth();
    const year = periodeConges.startDate.getUTCFullYear();
    let currentPeriodeMensuelle = PeriodeMensuelle.fromYearMonth(year, month);

    // partitioning the PeriodeConges into multiple PeriodeConges per PeriodeMensuelle
    const listPeriodeConges = [];
    let currentPeriode = periodeConges;
    while (
      !this.checkPeriodeCongesInsideMensuelle(currentPeriode, currentPeriodeMensuelle)
    ) {
      const generatedPeriodeConges = this.generatePeriodeCongesByPeriodeMensuelle(currentPeriode,currentPeriodeMensuelle);
      listPeriodeConges.push(generatedPeriodeConges);
      // iterate to nextPeriodeMensuelle and remove the periode that is represented
      //  by the generatedPeriodeConges 
      currentPeriodeMensuelle = currentPeriodeMensuelle.nextPeriodeMensuelle();
      currentPeriode.startDate = currentPeriodeMensuelle.startDate;
    }
    listPeriodeConges.push(currentPeriode);
    return listPeriodeConges;
  }

  /**
   * generate a PeriodeConges that that represents the periode 
   * of the PeriodeConges passed as argument that is fully included 
   * inside periodeMensuelle 
   * @param initialPeriodeConges A periodeConges partially included in
   *  PeriodeMensuelle 
   * @param periodeMensuelle A periodeMensuelle that represents the month
   *  of initialPeriodeConges.startDate
   */
  generatePeriodeCongesByPeriodeMensuelle(initialPeriodeConges: PeriodeConges, periodeMensuelle: PeriodeMensuelle): PeriodeConges {
    const generatedPerideConges = new PeriodeConges();
    const startDate = initialPeriodeConges.startDate;

    generatedPerideConges.startDate = new Date(startDate.valueOf());
    generatedPerideConges.endDate = periodeMensuelle.endDate;
    return generatedPerideConges;
  }
}
