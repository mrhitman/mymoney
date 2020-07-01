import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Post()
  public async create(
    @Body() createTransaction: CreateTransactionDto,
    @Request() req,
  ) {
    return this.service.create(createTransaction, req.user);
  }

  @Patch()
  public async update(
    @Body() updateTransaction: UpdateTransactionDto,
    @Request() req,
  ) {
    return this.service.update(updateTransaction, req.user);
  }

  @Delete('/:id')
  public async delete(@Param() id: string, @Request() req) {
    return this.service.delete(id, req.user);
  }

  @Get()
  public async getAll(@Request() req, @Query() query) {
    return this.service.getAll(req.user, query);
  }

  @Get('/statistic/:interval')
  public async getStatistic(
    @Request() req,
    @Param('interval') interval: string,
    @Query() query,
  ) {
    return this.service.getStatistic(req.user, { ...query, interval });
  }
}
