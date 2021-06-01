import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { StatisticsService } from '../statistics/statistics.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private statisticService: StatisticsService,
  ) {}

  @Get('/health')
  public healthCheck(): string {
    return new Date().toString();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res() response) {
    const tokens = await this.authService.login(req.user);
    response.cookie('token', tokens.accessToken, { httpOnly: true });
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    await this.statisticService.generateHistoryAll(req.user);
    response.json(tokens);
  }

  @Post('register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Request() req) {
    return this.authService.logout(req.user);
  }

  @Post('refresh')
  async refresh(@Body('token') token: string, @Res() response) {
    const tokens = await this.authService.refresh(token);
    response.cookie('token', tokens.accessToken, { httpOnly: true });
    response.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    response.json(tokens);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
