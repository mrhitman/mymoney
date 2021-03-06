import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { config } from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

const Jwt = JwtModule.register({
  secret: config.app.jwt.secret,
  signOptions: { expiresIn: config.app.jwt.expiresIn },
});
@Module({
  imports: [UsersModule, PassportModule, Jwt],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  exports: [AuthService, Jwt],
})
export class AuthModule {}
