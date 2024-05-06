import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.dev' });
} else {
  dotenv.config({});
}

if (process.env.ENABLE_APM === '1') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('elastic-apm-node').start({
    serviceName: 'ms-rrts-at-gateway-service',
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
  public NODE_ENV: string | undefined;
  public GATEWAY_JWT_TOKEN: string | undefined;
  public JWT_TOKEN: string | undefined;
  public CLIENT_URL: string | undefined;
  public ELASTIC_SEARCH_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public AUTH_BASE_URL: string | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || '1234';
    this.JWT_TOKEN = process.env.JWT_TOKEN || '1234';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.AUTH_BASE_URL = process.env.AUTH_BASE_URL || '';
  }
}

export const config: Config = new Config();
