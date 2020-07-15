import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  imports: [DatabaseModule],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule {}
