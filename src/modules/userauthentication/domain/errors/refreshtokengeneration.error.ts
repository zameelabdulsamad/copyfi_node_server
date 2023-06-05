export class RefreshTokenGenerationError extends Error {
  constructor() {
    super('Error generating Refresh Token');
    this.name = 'TokenGenerationError';
  }
}
