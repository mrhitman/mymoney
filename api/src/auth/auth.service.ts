import { BadRequestException, Injectable, Res } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { omit } from 'lodash';
import { RegisterInput } from 'src/app/input/register-input';
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

  public async login(
    user: Omit<User, 'password'>,
    @Res() response: Response,
    token?: RefreshToken,
  ) {
    const payload = { id: user.id };
    const refreshToken = token?.token || uuid();

    if (!token) {
      await RefreshToken.query().delete().where({ userId: user.id });
      await RefreshToken.query().insert({
        userId: user.id,
        token: refreshToken,
      });
    }

    response.cookie('refreshToken', refreshToken, { secure: true, httpOnly: true });
    return response.json({
      accessToken: 'Bearer ' + this.jwtService.sign(payload),
      refreshToken,
    });
  }

  public async register(data: RegisterInput) {
    const existUser = await User.query().findOne({ email: data.email });

    if (existUser) {
      throw new BadRequestException('User with such email is busy');
    }

    const user = await User.query().insert({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });

    return user;
  }

  public async logout(user: User) {
    await RefreshToken.query().delete().where({ userId: user.id });
  }

  public async refresh(token: string, @Res() response: Response) {
    const refreshToken = await RefreshToken.query().where({ token }).first();

    if (!refreshToken) {
      throw new BadRequestException('Invalid refresh token');
    }

    const user = await this.usersService.findById(refreshToken.userId);
    return this.login(user, response, refreshToken);
  }

  public async getUser(id: number) {
    const user = await this.usersService.findById(id);

    return omit(user, ['password']);
  }
}
