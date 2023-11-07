import validator from 'validator';

export const isEmail = (email: string) => {
  return validator.isEmail(email);
};

export const isStrongPassword = (password: string) => {
  return validator.isStrongPassword(password, {
    minLength: 12,
  });
};

export const isURL = (url: string) => {
  return validator.isURL(url);
};
