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
    const info = await this.service.getIsoInfo();

    return currencies
      .map((currency) => {
        const data = info.ISO_4217.CcyTbl.CcyNtry.find(
          (ccy) => ccy.Ccy === currency.name,
        );

        if (!data) {
          return;
        }

        return {
          ...currency,
          rate: rates.rates[currency.name],
          CtryNm: data.CtryNm,
          Ccy: data.Ccy,
          CcyNm: data.CcyNm,
          CcyNbr: Number(data.CcyNbr),
          CcyMnrUnts: Number(data.CcyMnrUnts),
        };
      })
      .filter(Boolean);
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(3600)
  public async findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
