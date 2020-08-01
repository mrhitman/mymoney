import { Module } from '@nestjs/common';
import { MonobankProvider } from './monobank.provider';
import { MonobankController } from './monobank.controller';

@Module({
  controllers: [MonobankController],
  providers: [MonobankProvider],
})
export class BanksModule {}
