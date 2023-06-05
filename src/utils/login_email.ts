const EMAIL_MOCK = 'a@mail.ru';

export function loginToEmail(login: string) {
  return login + EMAIL_MOCK;
}

export function emailToLogin(email: string) {
  return email ? email.slice(0,-EMAIL_MOCK.length) : '';
}