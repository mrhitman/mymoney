import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { createHash } from 'crypto';
import parcer from 'xml2json';
import User from 'src/database/models/user.model';

@Injectable()
export class Privat24Provider {
  protected client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'https://api.privatbank.ua/p24api/',
    });
  }

  public async import(user: User, id: string, token: string) { }

  protected getWallet(id: string, token: string) {
    const data = `<oper>cmt</oper><wait>0</wait><test>0</test><payment id=""></payment>${token}`
    return this.query('balance', this.getBody(data, id));
  }

  /**
   * @param id 
   * @param token 
   * @param from 07.08.2020
   * @param to 07.08.2020
   */
  protected getTransactions(id: string, token: string, from: string, to: string) {

    const data = `<oper>cmt</oper><wait>0</wait><test>0</test><payment id=""><prop name="sd" value="${from}" /><prop name="ed" value="${to}" /></payment>${token}`
    return this.query('https://api.privatbank.ua/p24api/rest_fiz', this.getBody(data, id));
  }

  private sha1(data) {
    return createHash('sha1').update(data).digest("hex");
  }

  private md5(data) {
    return createHash('md5').update(data).digest("hex");
  }

  private getBody(data: string, id: string) {
    const signature = this.sha1(this.md5(data));
    return `<?xml version="1.0" encoding="UTF-8"?>
    <request version="1.0">
    <merchant>
        <id>${id}</id>
        <signature>${signature}</signature>
    </merchant>
    <data>${data}</data>
</request>`;
  }

  private async query(url: string, body: string) {
    const response = await this.client.post(url, body,
      {
        headers: {
          'Content-Type': 'application/xml'
        }
      });

    const json = parcer.fromXml(response.data);
    return json?.response?.data;
  }
}
