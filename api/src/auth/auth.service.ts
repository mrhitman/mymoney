import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { omit } from 'lodash';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    protected readonly usersService: UsersService,
    protected readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === password) {
      return omit(user, ['password']);
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
