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

  async getRefreshToken(username: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.get(`/refresh-token/${username}`);
    return response;
  }

  async verifyEmail(token: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.put('/verify-email', { token });
    return response;
  }

  async resendEmail(data: { userId: number; email: string }): Promise<AxiosResponse> {
    const response: AxiosResponse = await axiosAuthInstance.post('/resend-email', data);
    return response;
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

  async forgotPassword(email: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.put('/forgot-password', { email });
    return response;
  }

  async resetPassword(token: string, password: string, confirmPassword: string): Promise<AxiosResponse> {
    const response: AxiosResponse = await this.axiosService.axios.put(`/reset-password/${token}`, { password, confirmPassword });
    return response;
  }
}

export const authService: AuthService = new AuthService();
