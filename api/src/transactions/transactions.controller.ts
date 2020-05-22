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
    await this.service.create(createTransaction, req.user);
  }

  @Patch()
  public async update(
    @Body() updateTransaction: UpdateTransactionDto,
    @Request() req,
  ) {
    await this.service.update(updateTransaction, req.user);
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
