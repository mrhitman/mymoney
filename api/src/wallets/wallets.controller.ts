import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { WalletsService } from './wallets.service';

@Controller('wallets')
@UseGuards(JwtAuthGuard)
@ApiHeader({ name: 'jwt token' })
export class WalletsController {
  constructor(private readonly service: WalletsService) {}

  @Get()
  public async getAll(@Request() req) {
    return this.service.getAll(req.user);
  }
}
