export class IncorrectOtpError extends Error {
  constructor() {
    super('Incorrect OTP provided');
    this.name = 'IncorrectOtpError';
  }
}
