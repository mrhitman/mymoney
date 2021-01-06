import { MailerService } from '@nestjs-modules/mailer';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import { UserDto } from 'src/users/dto/user.dto';
import { CurrentUser } from '../auth/current-user';
import { GqlAuthGuard } from '../auth/guards/gql-auth.quard';
import User from '../database/models/user.model';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LoginInput } from './input/login-input';
import { RefreshInput } from './input/refresh-input';
import { RegisterInput } from './input/register-input';
import { BadRequestException, UseGuards } from '@nestjs/common';

@Resolver()
export class AppResolver {
  constructor(
    private authService: AuthService,
    protected jwtService: JwtService,
    private localStrategy: LocalStrategy,
    private mailer: MailerService,
  ) {}

  @Mutation(() => LoginDto)
  public async login(@Args('loginData') data: LoginInput, @Context() context: any) {
    const user = await this.localStrategy.validate(data.email, data.password);
    const tokens = await this.authService.login(user);

    context.req.res.cookie('token', tokens.accessToken, { httpOnly: true });
    context.req.res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
    });

    return {
      ...tokens,
      profile: user,
    };
  }

  @Mutation(() => UserDto)
  public async register(@Args('registerData') data: RegisterInput) {
    const user = await this.authService.register(data);
    const token = await this.jwtService.sign(
      { id: user.id },
      { noTimestamp: true, expiresIn: '50y' },
    );

    await this.mailer.sendMail({
      to: user.email,
      from: 'kabalx47@gmail.com',
      subject: 'MyMoney Registration',
      template: 'registration',
      context: {
        confirmLink: `${process.env.HOST}/confirm-link/${Buffer.from(token).toString('base64')}`,
      },
    });

    return user;
  }

  @Mutation(() => String)
  public async recoveryPassword(@Args('email') email: String) {
    const user = await User.query().findOne({
      email,
    });

    if (!user) {
      throw new BadRequestException('No such user found');
    }

    const token = await this.jwtService.sign({ id: user.id }, { expiresIn: '10m' });
    await this.mailer.sendMail({
      to: user.email,
      from: 'kabalx47@gmail.com',
      subject: 'MyMoney Password Recovery',
      template: 'recovery-password',
      context: {
        recoveryLink: `${process.env.HOST}/change-password/${Buffer.from(token).toString(
          'base64',
        )}`,
      },
    });

    return 'OK';
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  public async changePassword(@Args('newPassword') password: string, @CurrentUser() user: User) {
    await this.authService.changePassword(user, password);
    return 'OK';
  }

  @Mutation(() => RefreshDto)
  public async refresh(@Args('refreshData') data: RefreshInput, @Context() context: any) {
    const tokens = await this.authService.refresh(data.refreshToken);
    context.req.res.cookie('token', tokens.accessToken, { httpOnly: true, saveSite: false });
    context.req.res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });
    return tokens;
  }
}
