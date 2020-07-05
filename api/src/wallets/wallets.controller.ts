import {
  Controller,
  Delete,
  Get,
  Param,
  Request,
  Response,
  UseGuards,
  Post,
  Body,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WalletsService } from './wallets.service';
import CreateWalletDto from '../../dist/wallets/dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
export class WalletsController {
  constructor(private readonly service: WalletsService) {}

  @Get('/')
  public async getAll(@Request() req) {
    return this.service.getAll(req.user);
  }

  @Get('/:id')
  public async findOne(@Param('id') id: string, @Response() req) {
    return this.service.findOne(id, req.user);
  }

  @Post()
  public async create(@Body() body: CreateWalletDto, @Request() req) {
    return this.service.create(body, req.user);
  }

  @Patch('/:id')
  public async update(@Body() body: UpdateWalletDto, @Request() req) {
    return this.service.update(body, req.user);
  }

  @Delete('/:id')
  public async delete(@Param('id') id: string, @Response() req) {
    return this.service.delete(id, req.user);
  }
}
