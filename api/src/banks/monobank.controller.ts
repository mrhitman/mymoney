import { Controller, Get } from '@nestjs/common';
import { MonobankProvider } from './monobank.provider';

@Controller('monobank')
export class MonobankController {
  constructor(protected readonly service: MonobankProvider) {}

  @Get('currency')
  public currency() {
    return this.service.getBankCurrency();
  }

  @Get('info')
  public personalInfo() {
    return this.service.getClientInfo();
  }

  @Get('statements')
  public personalStatements() {
    const to = ~~(+new Date() / 1000);
    const from = to - 31 * 24 * 60 * 60;
    const account = '3YOpmm2ou0onJwpjGoSGcw';
    return this.service.getStatements(from, to, account);
  }
}
