import {
  Controller,
  Get,
  Param,
  UseInterceptors,
  CacheInterceptor,
  CacheTTL,
} from '@nestjs/common';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
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
  @CacheTTL(60)
  public async findAll() {
    return this.service.findAll();
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60)
  public async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
