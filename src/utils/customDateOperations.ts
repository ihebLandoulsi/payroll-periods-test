/**
 * A Custom class used for Date
 */
export class CustomDateOperations {
  /**
   * returns the date that represents first day at 00:00 of the month
   *  of the date passed in paramater
   * @param date the date used to generate the result
   */
  static firstDayOfThatMonth(date: Date): Date {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const firstDayDate = new Date(Date.UTC(year, month, 1, 0, 0, 0));
    return firstDayDate;
  }

  /**
   * returns the date that represents last day at 23:59  of the month
   *  of the date passed in paramater
   * @param date the date used to generate the result
   */
  static lastDayOfThatMonth(date: Date): Date {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const lastDayDate = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59));
    return lastDayDate;
  }

}
