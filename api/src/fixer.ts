import { Injectable } from '@nestjs/common';
import fixer from 'fixer-api';
import { config } from 'src/config';

@Injectable()
export class Fixer {
  constructor() {
    fixer.set({ accessKey: config.fixer.apiKey });
  }

  public latest(base?: string) {
    return fixer.latest({ base });
  }
}
