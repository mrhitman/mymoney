import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Get()
  public healthCheck(): string {
    return new Date().toString();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
