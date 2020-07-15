import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WalletsResolver } from './wallets.resolver';
import { WalletsService } from './wallets.service';

@Module({
  imports: [DatabaseModule],
  providers: [WalletsResolver, WalletsService],
})
export class WalletsModule {}
