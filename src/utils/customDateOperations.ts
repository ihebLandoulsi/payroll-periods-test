export class CustomDateOperations {
  
  static firstDayOfThatMonth(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayDate = new Date(year, month);
    return firstDayDate;
  }

  static lastDayOfThatMonth(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDayDate = new Date(new Date(year, month + 1).getTime() - 1);
    return lastDayDate;
  }
}
