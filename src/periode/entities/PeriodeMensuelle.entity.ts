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
    periode.startDate = new Date(year, month);
    periode.endDate = CustomDateOperations.lastDayOfThatMonth(
      periode.startDate,
    );
    return periode;
  }

  /**
   * generate a PeriodeMensuelle that represents next month
   */
  nextPeriodeMensuelle(): PeriodeMensuelle {
    const month = this.startDate.getMonth() + 1;
    const year = this.startDate.getFullYear();
    const periode = PeriodeMensuelle.fromYearMonth(year, month);
    return periode;
  }
}
