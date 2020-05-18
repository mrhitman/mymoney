import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import RefreshToken from 'src/database/models/refresh-token.model';
import User from 'src/database/models/user.model';
import { UsersService } from 'src/users/users.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    protected readonly usersService: UsersService,
    protected readonly jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    const hash = await bcrypt.hash(password, 10);

    if (user && bcrypt.compare(password, hash)) {
      return omit(user, ['password']);
    }
  }

  public async login(user: User) {
    const payload = { id: user.id };
    const refreshToken = uuid();

    await RefreshToken.query().delete().where({ userId: user.id });
    await RefreshToken.query().insert({ userId: user.id, token: refreshToken });

    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken,
    };
  }
}
