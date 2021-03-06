import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from 'src/auth/auth.service';
import { config } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.app.jwt.ignoreExpiration,
      secretOrKey: config.app.jwt.secret,
    });
  }

  async validate(payload: { id: number }) {
    return this.authService.getUser(payload.id);
  }
}
