import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { PocketResolver } from './pocket.resolver';
import { WalletsResolver } from './wallets.resolver';
import { WalletsService } from './wallets.service';

@Module({
  imports: [DatabaseModule],
  providers: [WalletsResolver, PocketResolver, WalletsService],
})
export class WalletsModule {}
