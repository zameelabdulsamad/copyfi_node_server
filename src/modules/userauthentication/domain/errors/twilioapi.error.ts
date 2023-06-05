export class TwilioAPIError extends Error {
  constructor(originalErrorMessage: string) {
    super(`An error occurred while interacting with the Twilio API: ${originalErrorMessage}`);
    this.name = 'TwilioAPIError';
  }
}
