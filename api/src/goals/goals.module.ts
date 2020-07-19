import { Module } from '@nestjs/common';
import { GoalsResolver } from './goals.resolver';
import { GoalsService } from './goals.service';
import { DataLoader } from '../dataloader';

@Module({
  providers: [GoalsService, GoalsResolver, DataLoader],
})
export class GoalsModule {}
