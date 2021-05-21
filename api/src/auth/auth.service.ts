import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { groupBy, omit } from 'lodash';
import { v4 as uuid } from 'uuid';
import { RegisterInput } from '../app/input/register-input';
import Category from '../database/models/category.model';
import RefreshToken from '../database/models/refresh-token.model';
import UserCategory from '../database/models/user-category.model';
import User from '../database/models/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    protected readonly usersService: UsersService,
    protected readonly jwtService: JwtService,
  ) { }

  public async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return omit(user, ['password']);
    }
  }

  public async login(user: Omit<User, 'password'>, token?: RefreshToken) {
    const refreshToken = token?.token || uuid();

    if (!token) {
      await RefreshToken.query().delete().where({ userId: user.id });
      await RefreshToken.query().insert({
        userId: user.id,
        token: refreshToken,
      });
    }

    return {
      accessToken: this.jwtService.sign({ id: user.id }),
      refreshToken,
    };
  }

  public async register(data: RegisterInput) {
    const existUser = await User.query().findOne({ email: data.email });

    if (existUser) {
      throw new BadRequestException('Such email is busy');
    }

    const user = await User.query().insert({
      ...data,
      password: await bcrypt.hash(data.password, 10),
    });
    await this.createUserCategories(user);

    return user;
  }

  public async createUserCategories(user: User) {
    const count = ((await UserCategory.query()
      .where({ userId: user.id })
      .count({ count: '*' })) as any)[0].count;

    if (count) {
      return;
    }

    const categories = await Category.query();
    const rootUserCategories = groupBy(
      await UserCategory.query().insert(
        categories
          .filter((c) => !c.parent)
          .map((c) => ({
            id: uuid(),
            userId: user.id,
            categoryId: c.id,
            name: c.name,
            codes: c.codes,
            type: c.type,
            isFixed: c.isFixed,
            icon: c.icon,
          })),
      ),
      'categoryId',
    );

    await UserCategory.query().insert(
      categories
        .filter((c) => !!c.parent)
        .map((c) => ({
          id: uuid(),
          userId: user.id,
          categoryId: c.id,
          parent: rootUserCategories[c.parent][0].id,
          name: c.name,
          codes: c.codes,
          type: c.type,
          isFixed: c.isFixed,
          icon: c.icon,
        })),
    );
  }

  public async logout(user: User) {
    await RefreshToken.query().delete().where({ userId: user.id });
  }

  public async refresh(token: string) {
    const refreshToken = await RefreshToken.query().where({ token }).first();

    if (!refreshToken) {
      throw new BadRequestException('Invalid refresh token');
    }

    const user = await this.usersService.findById(refreshToken.userId);
    return this.login(user, refreshToken);
  }

  public async getUser(id: number) {
    const user = await this.usersService.findById(id);

    return user && omit(user, ['password']);
  }

  public async getUserByEmail(email: string) {
    const user = await this.usersService.findByEmail(email);
    return user && omit(user, ['password']);
  }

  public async changePassword(user: User, password: string) {
    await User.query()
      .update({
        password: await bcrypt.hash(password, 10),
      })
      .where({ id: user.id });

    return user;
  }
}
