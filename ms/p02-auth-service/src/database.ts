// sequelize with typescript https://sequelize.org/docs/v6/other-topics/typescript/

import { Logger } from 'winston';
import { winstonLogger } from '@yuangao0317/ms-rrts-at-shared-common';
import { config } from '@auth/config';
import { Sequelize } from 'sequelize';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'authServer', 'debug');

// https://sequelize.org/api/v6/class/src/sequelize.js~sequelize#instance-constructor-constructor
export const sequelize: Sequelize = new Sequelize(config.MYSQL_DB!, {
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    multipleStatements: true
  }
});
// https://dev.to/anonyma/how-to-retry-transactions-in-sequelize-5h5c
/*
retry: {
  match: [
    /SequelizeConnectionError/,
    /SequelizeConnectionRefusedError/,
    /SequelizeHostNotFoundError/,
    /SequelizeHostNotReachableError/,
    /SequelizeInvalidConnectionError/,
    /SequelizeConnectionTimedOutError/
  ],
  name: 'query',
  backoffBase: 100,
  backoffExponent: 1.1,
  timeout: 60000,
  max: Infinity
}
*/
/*
{
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true,
    //this is to force mysql2 lib to coerce decimal numbers into actual numbers instead of strings https://github.com/sequelize/sequelize/issues/8019
    decimalNumbers: true
  },
  replication: {
    write: {
      host: process.env.MYSQL_MASTER_HOST,
      port: process.env.MYSQL_MASTER_PORT,
      username: process.env.MYSQL_MASTER_USERNAME,
      password: process.env.MYSQL_MASTER_PASSWORD
    },
    read: [{
      host: process.env.MYSQL_SLAVE_HOST,
      port: process.env.MYSQL_SLAVE_PORT,
      username: process.env.MYSQL_SLAVE_USERNAME,
      password: process.env.MYSQL_SLAVE_PASSWORD
    }]
  },
  pool: {
    max: process.env.MYSQL_MASTER_CONNECTION_LIMIT,
    min: 1,
    idle: 10000
  },
  define: {
    timestamps: false
  }
}
*/

export async function databaseConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    log.info('AuthService - Mysql database connection has been established successfully.');
  } catch (error) {
    log.error('AuthService - Unable to connect to database.');
    log.log('error', 'AuthService databaseConnection() method error:', error);
  }
}
