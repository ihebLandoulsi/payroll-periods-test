import { CustomDateOperations } from 'src/utils/customDateOperations';
import { Entity } from 'typeorm';
import { Periode } from './periode.entity';

@Entity()
export class PeriodeMensuelle extends Periode {
  /**
   * generate a Periode Mensuelle that represents that month
   * @param year the year in which the Periode starts
   * @param month the month in which the Periode ends
   */
  static fromYearMonth(year: number, month: number): PeriodeMensuelle {
    const periode = new PeriodeMensuelle();
    periode.startDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    periode.endDate = CustomDateOperations.lastDayOfThatMonth(periode.startDate);
    return periode;
  }

  /**
   * generate a PeriodeMensuelle that represents next month
   */
  nextPeriodeMensuelle(): PeriodeMensuelle {
    let month = this.startDate.getUTCMonth() + 1;
    let year = this.startDate.getUTCFullYear();
    if (month >= 12) {
      month = 0;
      year = year + 1;
    }
    const periode = PeriodeMensuelle.fromYearMonth(year, month);
    return periode;
  }
}
