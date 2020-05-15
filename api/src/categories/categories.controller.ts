import {
  Body,
  Controller,
  Patch,
  Post,
  Get,
  Delete,
  Param,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  public async create(@Body() createCategory: CreateCategoryDto) {
    await this.service.create(createCategory);
  }

  @Patch()
  public async update(@Body() updateCategory: UpdateCategoryDto) {
    await this.service.update(updateCategory);
  }

  @Delete('/:id')
  public async delete(@Param() id: string) {
    await this.service.delete(id);
  }

  @Get()
  public async getAll() {
    return this.service.getAll();
  }
}
