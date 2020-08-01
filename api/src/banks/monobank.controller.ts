import { Controller, Get, Post } from '@nestjs/common';
import { MonobankProvider } from './monobank.provider';
import User from 'src/database/models/user.model';

@Controller('monobank')
export class MonobankController {
  constructor(protected readonly service: MonobankProvider) { }

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
    return this.service.getStatements(from, to);
  }

  @Post('import')
  public async import() {
    const user = await User.query().findById(1);
    return this.service.import(user);
  }
}
