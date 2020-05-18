import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}

  @Post()
  public async create(
    @Body() createCategory: CreateCategoryDto,
    @Request() req,
  ) {
    await this.service.create(createCategory, req.user);
  }

  @Patch()
  public async update(
    @Body() updateCategory: UpdateCategoryDto,
    @Request() req,
  ) {
    await this.service.update(updateCategory, req.user);
  }

  @Delete('/:id')
  public async delete(@Param() id: string, @Request() req) {
    await this.service.delete(id, req.user);
  }

  @Get()
  public async getAll(@Request() req) {
    return this.service.getAll(req.user);
  }
}
