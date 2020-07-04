import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('goals')
export class GoalsController {
  @Get('/')
  public async getAll() {
    return [];
  }

  @Get('/:id')
  public async findOne() {}

  @Patch('/:id')
  public async update() {}

  @Post()
  public async create() {}

  @Post('/:id')
  public async delete() {}
}
