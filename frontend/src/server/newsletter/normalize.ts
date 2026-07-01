const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const normalizeEmail = (value: string) => value.trim().toLowerCase();

export const isValidEmail = (value: string) => EMAIL_REGEX.test(value);
