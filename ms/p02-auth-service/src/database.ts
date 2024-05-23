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

export async function databaseConnection(): Promise<void> {
  try {
    await sequelize.authenticate();
    log.info('AuthService - Mysql database connection has been established successfully.');
  } catch (error) {
    log.error('AuthService - Unable to connect to database.');
    log.log('error', 'AuthService databaseConnection() method error:', error);
  }
}
