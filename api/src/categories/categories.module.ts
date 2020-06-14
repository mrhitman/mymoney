import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CategoriesController } from './categories.controller';
import { CategoriesResolver } from './categories.resolver';
import { CategoriesService } from './categories.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriesController],
  providers: [CategoriesResolver, CategoriesService],
})
export class CategoriesModule { }
