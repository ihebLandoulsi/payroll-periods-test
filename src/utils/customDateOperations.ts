/**
 * A Custom class used for redundent operations with Date
 */
export class CustomDateOperations {
  
  /**
   * returns the date that represents first day at 00:00 of the month
   *  of the date passed in paramater 
   * @param date the date used to generate the result
   */
  static firstDayOfThatMonth(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayDate = new Date(year, month);
    return firstDayDate;
  }

  /**
   * returns the date that represents last day at 23:59  of the month
   *  of the date passed in paramater
   * @param date the date used to generate the result
   */
  static lastDayOfThatMonth(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDayDate = new Date(new Date(year, month + 1).getTime() - 1);
    return lastDayDate;
  }

}
