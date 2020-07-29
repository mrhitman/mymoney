import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { LocalStrategy } from 'src/auth/strategies/local.strategy';
import User from 'src/database/models/user.model';
import { UserDto } from 'src/users/dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LoginInput } from './input/login-input';
import { RefreshInput } from './input/refresh-input';
import { RegisterInput } from './input/register-input';

@Resolver()
export class AppResolver {
  constructor(
    private authService: AuthService,
    private localStrategy: LocalStrategy,
  ) { }

  @Mutation(() => LoginDto)
  public async login(@Args('loginData') data: LoginInput) {
    const user = await this.localStrategy.validate(data.email, data.password);
    const tokens = await this.authService.login(user);

    return {
      ...tokens,
      profile: user,
    };
  }

  @Mutation(() => UserDto)
  public async register(@Args('registerData') data: RegisterInput) {
    return this.authService.register(data);
  }

  @Mutation(() => RefreshDto)
  public async refresh(@Args('refreshData') data: RefreshInput) {
    return this.authService.refresh(data.refreshToken);
  }
}
