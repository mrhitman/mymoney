import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import Currency from 'src/database/models/currency.model';
import { Fixer } from 'src/fixer';
import xml2js from 'xml2js';
import { GetRateResponse } from 'common/responses';

@Injectable()
export class CurrenciesService {
  constructor(protected fixer: Fixer) {}

  public async findAll() {
    const currencies = await Currency.query();

    return currencies;
  }

  public async findOne(id: string) {
    const currency = await Currency.query().findOne({ id });

    if (!currency) {
      throw new NotFoundException();
    }

    return currency;
  }

  public async rates(base?: string) {
    const response = await this.fixer.latest(base);

    return response as GetRateResponse;
  }

  /**
   * ISO_4217 standart
   * https://en.wikipedia.org/wiki/ISO_4217
   */
  async getIsoInfo() {
    const url = 'https://www.currency-iso.org/dam/downloads/lists/list_one.xml';
    const body = await axios.get(url);
    const response = await new Promise((resolve, reject) => {
      xml2js.parseString(body.data, { explicitArray: false }, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });

    return response;
  }
}
