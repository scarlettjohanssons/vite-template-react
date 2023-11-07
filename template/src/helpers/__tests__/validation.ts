import { isURL, isStrongPassword, isEmail } from '../validation';

describe('regex', () => {
  test('isEmail', () => {
    expect(isEmail('test@')).toBe(false);
    expect(isEmail('test@test')).toBe(false);
    expect(isEmail('test@test.')).toBe(false);
    expect(isEmail('test@test@test.uq')).toBe(false);
    expect(isEmail('test@test.uq')).toBe(true);
    expect(isEmail('te.st@test.uq')).toBe(true);
  });

  test('isStrongPassword', () => {
    expect(isStrongPassword('12345')).toBe(false);
    expect(isStrongPassword('qwerqwe')).toBe(false);
    expect(isStrongPassword('4ewr@')).toBe(false);
    expect(isStrongPassword('fwefW')).toBe(false);
    expect(isStrongPassword('Ltpuzk36!')).toBe(false);
    expect(isStrongPassword('111111111111')).toBe(false);
    expect(isStrongPassword('1234Asd!wesd')).toBe(true);
  });

  test('isURL', () => {
    expect(isURL('https://www.google.com')).toBe(true);
    expect(isURL('https://www.google.com')).toBe(true);
    expect(isURL('www.google.com')).toBe(true);
    expect(isURL('google.com')).toBe(true);
    expect(isURL('google')).toBe(false);
  });
});
