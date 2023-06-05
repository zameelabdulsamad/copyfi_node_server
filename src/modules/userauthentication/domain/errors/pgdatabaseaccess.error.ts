export class DatabaseAccessError extends Error {
  constructor(originalErrorMessage: string) {
    super('Error accessing the database');
    super(`An error occurred while accessing the PGdatabase: ${originalErrorMessage}`);

    this.name = 'DatabaseAccessError';
  }
}
