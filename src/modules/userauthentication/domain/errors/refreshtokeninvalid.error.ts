export class InvalidRefreshTokenError extends Error {
  constructor() {
    super('Invalid or expired Refresh Token');
    this.name = 'InvalidRefreshTokenError';
  }
}
