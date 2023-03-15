export class SendingOtpError extends Error {
  constructor() {
    super('Error sending OTP');
    this.name = 'SendingOtpError';
    this.message = 'Error sending OTP';
  }
}
