import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import User from 'src/database/models/user.model';
import { UsersService } from 'src/users/users.service';

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

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
