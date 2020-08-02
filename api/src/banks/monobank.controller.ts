import { Body, Controller, Get, Post } from '@nestjs/common';
import User from 'src/database/models/user.model';
import { MonobankProvider } from './monobank.provider';

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

  @Post('connect')
  public async connect(@Body('token') token: string) {
    const user = await User.query().findById(1);

    return user.$query().update({
      connections: [...user.connections.filter(c => !(c.type === 'mono' && c.token === token)), {
        type: 'monobank',
        token
      }]
    })
  }

  @Post('import')
  public async import() {
    const user = await User.query().findById(1);

    return Promise.all(
      user.connections.filter(c => c.type === 'monobank').map(c => this.service.import(user, c.token))
    );
  }
}
