import { Module } from '@nestjs/common';
import { GoalsService } from './goals.service';

@Module({
  providers: [GoalsService],
})
export class GoalsModule {}
