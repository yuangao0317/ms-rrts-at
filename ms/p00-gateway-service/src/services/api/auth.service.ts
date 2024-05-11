import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '@gateway/config';
import { IAuth } from '@yuangao0317/ms-rrts-at-shared-common';

export let axiosAuthInstance: ReturnType<typeof axios.create>;

class AuthService {
  axiosService: AxiosService;
  private readonly AUTH_API_PATH: string = 'api/v1/auth';

  constructor() {
    this.axiosService = new AxiosService(`${config.AUTH_BASE_URL}/${this.AUTH_API_PATH}`, 'auth');
    axiosAuthInstance = this.axiosService.axios;
  }

  async getCurrentUser(): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.get('/currentuser');
    return response;
  }

  async signUp(body: IAuth): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.post('/signup', body);
    return response;
  }

  async signIn(body: IAuth): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.post('/signin', body);
    return response;
  }
}

export const authService: AuthService = new AuthService();
