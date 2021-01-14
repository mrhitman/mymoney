import { Module } from '@nestjs/common';
import { DataLoader } from '../dataloader';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  providers: [CategoriesResolver, CategoriesService, DataLoader],
})
export class CategoriesModule {}
