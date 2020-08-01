import { Injectable } from '@nestjs/common';
import axios, { AxiosAdapter, AxiosInstance } from 'axios';

@Injectable()
export class MonobankProvider {
  protected client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.monobank.ua/',
    });
  }

  public async getBankCurrency() {
    try {
      const response = await this.client.get('bank/currency');
      return response.data;
    } catch (e) {
      return e.message;
    }
  }

  public async getClientInfo() {
    try {
      const response = await this.client.get('personal/client-info', {
        headers: {
          'X-Token': process.env.MONO_TOKEN,
        },
      });
      return response.data;
    } catch (e) {
      return e.message;
    }
  }

  public async getStatements(from: number, to: number, account: string = '0') {
    try {
      const response = await this.client.get(
        `personal/statement/${account}/${from}/${to}`,
        {
          headers: {
            'X-Token': process.env.MONO_TOKEN,
          },
        },
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }
}
