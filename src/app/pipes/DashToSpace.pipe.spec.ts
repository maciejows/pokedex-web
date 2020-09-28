import { DashToSpacePipe } from './DashToSpace.pipe';

describe('CharToSpacePipe', () => {
  const pipe = new DashToSpacePipe();

  it('should create pipe', () => {
    expect(pipe).toBeTruthy();
  });
  it('transforms "abc-defg" to "abc defg"', () => {
    expect(pipe.transform('abc-defg')).toBe('abc defg');
  });
  it('transforms "abc-defg-hi" to "abc defg hi"', () => {
    expect(pipe.transform('abc-defg-hi')).toBe('abc defg hi');
  });
});
