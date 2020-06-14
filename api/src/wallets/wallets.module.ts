import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { WalletsController } from './wallets.controller';
import { WalletsResolver } from './wallets.resolver';
import { WalletsService } from './wallets.service';

@Module({
  imports: [DatabaseModule],
  controllers: [WalletsController],
  providers: [WalletsResolver, WalletsService],
})
export class WalletsModule {}
