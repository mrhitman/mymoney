import { Module } from '@nestjs/common';
import { GoalsResolver } from './goals.resolver';
import { GoalsService } from './goals.service';

@Module({
  providers: [GoalsService, GoalsResolver],
})
export class GoalsModule {}
