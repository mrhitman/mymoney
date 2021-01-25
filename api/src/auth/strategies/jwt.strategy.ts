import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: Boolean(process.env.JWT_IGNORE_EXPIRATION) || false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: { id: number }) {
    return this.authService.getUser(payload.id);
  }
}
