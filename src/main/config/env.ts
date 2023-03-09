require('dotenv').config();

// eslint-disable-next-line no-console
export default {
  port: process.env.PORT,
  postgresConfig: {
    postgresDbHost: process.env.POSTGRESQL_DB_HOST,
    postgresDbPort: process.env.POSTGRESQL_DB_PORT,
    postgresDbUser: process.env.POSTGRESQL_DB_USER,
    postgresDbPassword: process.env.POSTGRESQL_DB_PASSWORD,
    postgresDb: process.env.POSTGRESQL_DB,
  },

};
