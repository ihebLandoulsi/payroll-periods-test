import { CustomDateOperations } from './customDateOperations';

describe('CustomDateOperations Unit Tests', () => {
  let date;
  
  beforeEach(() => {
    date = new Date(Date.UTC(1956, 2, 20, 3, 14, 15));
  });

  it('should call firstDayOfThatMonth and return expected Date', () => {
    const expectedDate = new Date(Date.UTC(1956, 2, 1, 0, 0, 0));

    const generatedDate = CustomDateOperations.firstDayOfThatMonth(date);

    expect(generatedDate).toEqual(expectedDate);
  });

  it('should call lastDayOfThatMonth and return expected Date', () => {
    const expectedDate = new Date(Date.UTC(1956, 2, 31, 23, 59, 59));

    const generatedDate = CustomDateOperations.lastDayOfThatMonth(date);

    expect(generatedDate).toEqual(expectedDate);
  });
});
