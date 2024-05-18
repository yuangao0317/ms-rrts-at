import { config } from '@gateway/config';
import axios from 'axios';
import { sign } from 'jsonwebtoken';

type AxiosType = ReturnType<typeof axios.create>;

export class AxiosService {
  public readonly axios: AxiosType;

  constructor(baseUrl: string, serviceName: string) {
    this.axios = this.axiosCreateInstance(baseUrl, serviceName);
  }

  private axiosCreateInstance(baseUrl: string, serviceName?: string): AxiosType {
    let requestGatewayToken = '';
    if (serviceName) {
      requestGatewayToken = sign({ id: serviceName }, `${config.GATEWAY_JWT_TOKEN}`);
    }
    console.log('requestGatewayToken', requestGatewayToken);
    const instance: AxiosType = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        gatewaytoken: requestGatewayToken
      },
      withCredentials: true
    });

    return instance;
  }
}
