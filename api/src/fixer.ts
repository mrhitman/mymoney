import { Injectable } from '@nestjs/common';
import fixer from 'fixer-api';

@Injectable()
export class Fixer {
  constructor() {
    fixer.set({ accessKey: process.env.FIXER_API_KEY });
  }

  public latest(base?: string) {
    return fixer.latest({ base });
  }
}
