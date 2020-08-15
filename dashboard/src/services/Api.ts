import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { gql } from '@apollo/client';

interface ApiParams {
  accessToken?: string;
  refreshToken?: string;
}

export class Api {
  private static instance: Api;
  protected accessToken?: string;
  protected refreshToken?: string;
  protected client: ApolloClient<InMemoryCache>;

  constructor(options: ApiParams = {}) {
    this.accessToken = options.accessToken;
    this.refreshToken = options.refreshToken;
    this.client = new ApolloClient({
      uri: process.env.REACT_APP_SERVER,
    });
  }

  public static getInstance(options: ApiParams = {}) {
    return Api.instance || new Api(options);
  }

  public async login(username: string, password: string) {
    const response = await this.client.mutate({
      mutation: gql`
        mutation {
          login(loginData: { email: "${username}", password: "${password}" }) {
            accessToken
          }
        }
      `,
    });

    this.accessToken = response.data.login.accessToken;
    this.refreshToken = response.data.login.refreshToken;
    localStorage.setItem('accessToken', this.accessToken!);
    localStorage.setItem('refreshToken', this.refreshToken!);
    return response.data.login;
  }

  public async logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  public async refresh() {
    const response = await this.client.mutate({
      mutation: gql`
        mutation {
          refresh(refreshData: { refreshToken: "${this.refreshToken}" }) {
            accessToken
            refreshToken
          }
        }
      `,
    });

    this.accessToken = response.data.refresh.accessToken;
    this.refreshToken = response.data.refresh.refreshToken;
    localStorage.setItem('accessToken', this.accessToken!);
    localStorage.setItem('refreshToken', this.refreshToken!);
    return response.data.refresh;
  }
}

export default Api;
