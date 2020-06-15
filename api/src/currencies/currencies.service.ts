import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import { GetRateResponse } from 'common/responses';
import Currency from 'src/database/models/currency.model';
import { Fixer } from 'src/fixer';
import xml2js from 'xml2js';

interface InfoResponse {
  ISO_4217: {
    $: {
      Pblshd: string;
    };
    CcyTbl: {
      CcyNtry: Array<{
        CtryNm: string;
        CcyNm: string;
        Ccy: string;
        CcyNbr: number;
        CcyMnrUnts: number;
      }>;
    };
  };
}

@Injectable()
export class CurrenciesService {
  constructor(protected fixer: Fixer, @Inject(CACHE_MANAGER) private readonly cache) { }

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
    const rates = await this.cache.get('rates')

    console.log(rates)
    if (rates) {
      return rates as GetRateResponse;
    }

    const response = await this.fixer.latest(base);
    await this.cache.set('rates', response, { ttl: 3600 });

    return response as GetRateResponse;
  }

  /**
   * ISO_4217 standart
   * https://en.wikipedia.org/wiki/ISO_4217
   */
  public async getIsoInfo(): Promise<any> {
    const iso4217 = await this.cache.get('ISO_4217');

    if (iso4217) {
      return iso4217;
    }

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

    await this.cache.set('ISO_4217', response, { ttl: 3600 * 24 * 7 });
    return response as InfoResponse;
  }
}
