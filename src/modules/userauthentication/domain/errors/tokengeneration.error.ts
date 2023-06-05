export class TokenGenerationError extends Error {
  constructor() {
    super('Error generating token');
    this.name = 'TokenGenerationError';
  }
}
