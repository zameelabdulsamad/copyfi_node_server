export class VerifyingOtpError extends Error {
  constructor() {
    super('Error verifying OTP');
    this.name = 'VerifyingOtpError';
  }
}
