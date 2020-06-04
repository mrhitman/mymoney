import axios, { AxiosInstance } from 'axios';
import { LoginResponse, RefreshResponse } from 'common/responses';

interface ApiParams {
  accessToken?: string | null;
  refreshToken?: string | null;
  client?: AxiosInstance;
}

export class Api {
  protected accessToken?: string | null;
  protected refreshToken?: string | null;
  protected onLogout?: Function;
  public readonly client: AxiosInstance;

  constructor(options: ApiParams = {}) {
    this.client =
      options.client || axios.create({ baseURL: process.env.REACT_APP_SERVER });
    this.accessToken = options.accessToken;
    this.refreshToken = options.refreshToken;

    this.client.interceptors.request.use(
      (config) => {
        if (!this.accessToken) {
          return config;
        }

        const newConfig = {
          headers: {},
          ...config,
        };

        newConfig.headers.Authorization = `Bearer ${this.accessToken}`;
        return newConfig;
      },
      (e) => Promise.reject(e)
    );

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          !this.refreshToken ||
          error.response.status !== 401 ||
          error.config.retry
        ) {
          throw error;
        }

        try {
          const response = await this.refresh();
          this.accessToken = response.accessToken;
          this.refreshToken = response.refreshToken;
        } catch (e) {
          this.accessToken = undefined;
          this.refreshToken = undefined;

          if (this.onLogout) {
            this.onLogout();
          } else {
            localStorage.clear();
          }

          throw e;
        }

        const newRequest = {
          ...error.config,
          retry: true,
        };
        return this.client(newRequest);
      }
    );
  }

  public setOnLogout(callback: Function) {
    this.onLogout = callback;
  }

  public async login(username: string, password: string) {
    const response = await this.client.post<LoginResponse>('login', {
      username,
      password,
    });

    this.accessToken = response.data.accessToken;
    this.refreshToken = response.data.refreshToken;
    localStorage.setItem('accessToken', this.accessToken);
    localStorage.setItem('refreshToken', this.refreshToken);
    return response.data;
  }

  public async logout() {
    await this.client.post('logout');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  public async refresh() {
    const response = await this.client.post<RefreshResponse>('refresh', {
      token: this.refreshToken,
    });

    return response.data;
  }
}

export default new Api();
