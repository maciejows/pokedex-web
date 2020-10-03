import { CountPagesPipe } from './CountPages.pipe';

describe('CountPagesPipe', () => {
  const pipe = new CountPagesPipe();

  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });
  it('should return array from 1 to 10', () => {
    const expectedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(pipe.transform(100, 10)).toEqual(expectedArray);
  });
  it('should return "[0]" (total = 0)', () => {
    expect(pipe.transform(100, 0)).toEqual([0]);
  });
  it('should return "[0]" (total < 0)', () => {
    expect(pipe.transform(100, -4)).toEqual([0]);
  });
});
