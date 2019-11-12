import axios from 'axios';
import xml2js from 'xml2js';
import fixer from '../../services/fixer';
import redis from '../../services/redis';

export class CurrencyProvider {
  async latest(base?: string) {
    const rates = await redis.get('rates');
    if (rates) {
      return JSON.parse(rates);
    }
    const response = await fixer.latest({ base });
    await redis.set('rates', JSON.stringify(response), 'EX', 3600);
    return response;
  }

  /**
   * ISO_4217 standart
   */
  async getIsoInfo() {
    const url = 'https://www.currency-iso.org/dam/downloads/lists/list_one.xml';
    const body = await axios.get(url);
    return new Promise((resolve, reject) => {
      xml2js.parseString(body.data, { explicitArray: false }, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    });
  }
}

export default CurrencyProvider;
