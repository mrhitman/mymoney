import {
  Controller,
  Get,
  Param,
  UseGuards
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
@UseGuards(JwtAuthGuard)
export class CurrenciesController {
  constructor(protected service: CurrenciesService) { }

  @Get('/rates')
  public async rates() {
    return this.service.rates();
  }

  @Get('/iso-info')
  public async getIsoInfo() {
    return this.service.getIsoInfo();
  }

  @Get()
  public async findAll() {
    const currencies = await this.service.findAll();
    const rates = await this.service.rates();

    return currencies
      .map((currency) => ({
        ...currency,
        rate: rates.rates[currency.name],
      }))
      .filter(Boolean);
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
