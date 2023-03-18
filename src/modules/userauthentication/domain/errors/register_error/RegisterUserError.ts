export class RegisterUserError extends Error {
  constructor() {
    super('Error registering user');
    this.name = 'RegisterUserError';
  }
}
