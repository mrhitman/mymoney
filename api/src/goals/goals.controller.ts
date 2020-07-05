import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import CreateGoalDto from 'src/goals/dto/create-goal.dto';
import UpdateGoalDto from 'src/goals/dto/update-goal.dto';
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

  @Post()
  public async create(@Body() body: CreateGoalDto, @Request() req) {
    return this.service.create(body, req.user);
  }

  @Patch('/:id')
  public async update(@Body() body: UpdateGoalDto, @Request() req) {
    return this.service.update(body, req.user);
  }

  @Post('/:id')
  public async delete(@Param('id') id: string, @Request() req) {
    return this.service.delete(id, req.user);
  }
}
