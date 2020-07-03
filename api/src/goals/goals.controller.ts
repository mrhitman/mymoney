import { Controller, Get } from '@nestjs/common';

@Controller('goals')
export class GoalsController {
  @Get('/')
  public async getAll() {
    return [];
  }

  @Get('/:id')
  public async getOne() {}
}
