import { isValidValue, isCheckValueAndSetParams, hasProperty, isValidObject, getValueFromObject } from '../helper';

describe('isValidValue', () => {
  it('returns false for undefined', () => {
    expect(isValidValue(undefined)).toBe(false);
  });

  it('returns false for null', () => {
    expect(isValidValue(null)).toBe(false);
  });

  it('returns false for empty string', () => {
    expect(isValidValue('')).toBe(false);
  });

  it('returns true for a string', () => {
    expect(isValidValue('hello')).toBe(true);
  });

  it('returns true for zero', () => {
    expect(isValidValue(0)).toBe(true);
  });
});

describe('isCheckValueAndSetParams', () => {
  it('returns empty string for undefined value', () => {
    expect(isCheckValueAndSetParams('&key=', undefined)).toBe('');
  });

  it('returns empty string for null value', () => {
    expect(isCheckValueAndSetParams('&key=', null)).toBe('');
  });

  it('returns empty string for empty value', () => {
    expect(isCheckValueAndSetParams('&key=', '')).toBe('');
  });

  it('returns params + value for valid value', () => {
    expect(isCheckValueAndSetParams('&key=', 'test')).toBe('&key=test');
  });
});

describe('hasProperty', () => {
  it('returns false for array', () => {
    expect(hasProperty([], 'key')).toBe(false);
  });

  it('returns false for non-string key', () => {
    expect(hasProperty({}, 123)).toBe(false);
  });

  it('returns false for null object', () => {
    expect(hasProperty(null, 'key')).toBe(false);
  });

  it('returns true when object has property', () => {
    expect(hasProperty({ key: 'value' }, 'key')).toBe(true);
  });

  it('returns false when object lacks property', () => {
    expect(hasProperty({ key: 'value' }, 'other')).toBe(false);
  });
});

describe('isValidObject', () => {
  it('returns false for empty object', () => {
    expect(isValidObject({})).toBe(false);
  });

  it('returns true for non-empty object', () => {
    expect(isValidObject({ key: 'value' })).toBe(true);
  });
});

describe('getValueFromObject', () => {
  it('returns value when property exists', () => {
    expect(getValueFromObject({ name: 'test' }, 'name')).toBe('test');
  });

  it('returns empty string when property does not exist', () => {
    expect(getValueFromObject({ name: 'test' }, 'other')).toBe('');
  });
});
