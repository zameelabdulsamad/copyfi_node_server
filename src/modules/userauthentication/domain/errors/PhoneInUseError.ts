export class PhoneInUseError extends Error {
  constructor() {
    super('Phone Number is already in use');
    this.name = 'PhoneInUseError';
  }
}
