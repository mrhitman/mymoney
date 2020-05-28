import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
@UseGuards(JwtAuthGuard)
export class CurrenciesController {
  constructor(protected service: CurrenciesService) {}

  @Get('/rates')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600)
  public async rates() {
    return this.service.rates();
  }

  @Get('/iso-info')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600 * 24 * 30)
  public async getIsoInfo() {
    return this.service.getIsoInfo();
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600)
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
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600)
  public async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
