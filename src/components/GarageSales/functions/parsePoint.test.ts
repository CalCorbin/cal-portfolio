import { parsePoint } from './parsePoint';

describe('parsePoint', () => {
  it('parses a valid shape string into a [lat, lng] tuple', () => {
    expect(parsePoint('35.4676,-97.5164,19')).toEqual([35.4676, -97.5164]);
  });

  it('returns null when shape is null', () => {
    expect(parsePoint(null)).toBeNull();
  });

  it('returns null when shape is undefined', () => {
    expect(parsePoint(undefined)).toBeNull();
  });

  it('returns null when shape is an empty string', () => {
    expect(parsePoint('')).toBeNull();
  });

  it('returns null when shape contains non-numeric values', () => {
    expect(parsePoint('abc,def,19')).toBeNull();
  });
});
