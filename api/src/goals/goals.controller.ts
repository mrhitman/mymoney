import {
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GoalsService } from './goals.service';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalsController {
  public constructor(protected readonly service: GoalsService) {}

  @Get('/')
  public async getAll(@Request() req) {
    return this.service.findAll(req.user);
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string, @Request() req) {
    return this.service.findOne(id, req.user);
  }

  @Patch('/:id')
  public async update() {}

  @Post()
  public async create() {}

  @Post('/:id')
  public async delete(@Param('id') id: string, @Request() req) {
    return this.service.delete(id, req.user);
  }
}
