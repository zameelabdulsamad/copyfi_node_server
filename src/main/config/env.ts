require('dotenv').config();

// eslint-disable-next-line no-console
export default {
  port: process.env.PORT,
  jwtSecurityKey: process.env.JWT_SECRET_KEY,
  postgresConfig: {
    postgresDbHost: process.env.POSTGRESQL_DB_HOST,
    postgresDbPort: process.env.POSTGRESQL_DB_PORT,
    postgresDbUser: process.env.POSTGRESQL_DB_USER,
    postgresDbPassword: process.env.POSTGRESQL_DB_PASSWORD,
    postgresDb: process.env.POSTGRESQL_DB,

  },
  twilioConfig: {
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
    twilioServiceSid: process.env.TWILIO_SERVICE_SID,
  },

};
