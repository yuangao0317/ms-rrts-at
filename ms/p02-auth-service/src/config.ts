import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.dev' });
  } else {
    dotenv.config({});
  }

if (process.env.ENABLE_APM === '1') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('elastic-apm-node').start({
    serviceName: 'ms-rrts-at-auth-service',
    serverUrl: process.env.ELASTIC_APM_SERVER_URL,
    secretToken: process.env.ELASTIC_APM_SECRET_TOKEN,
    environment: process.env.NODE_ENV,
    active: true,
    captureBody: 'all',
    errorOnAbortedRequests: true,
    captureErrorLogStackTraces: 'always'
  });
}

class Config {
  public readonly NODE_ENV: string | undefined;
  public readonly CLIENT_URL: string | undefined;
  public readonly RABBITMQ_ENDPOINT: string | undefined;
  public readonly MYSQL_DB: string | undefined;
  public readonly JWT_TOKEN: string | undefined;
  public readonly CLOUD_NAME: string | undefined;
  public readonly CLOUD_API_KEY: string | undefined;
  public readonly CLOUD_API_SECRET: string | undefined;
  public readonly GATEWAY_JWT_TOKEN: string | undefined;
  public readonly API_GATEWAY_URL: string | undefined;
  public readonly ELASTIC_SEARCH_URL: string | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN || '';
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || '';
    this.RABBITMQ_ENDPOINT = process.env.RABBITMQ_ENDPOINT || '';
    this.MYSQL_DB = process.env.MYSQL_DB || '';
    this.CLOUD_NAME = process.env.CLOUD_NAME || '';
    this.CLOUD_API_KEY = process.env.CLOUD_API_KEY || '';
    this.CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || '';
    this.API_GATEWAY_URL = process.env.API_GATEWAY_URL || '';
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
  }
}

export const config: Config = new Config();