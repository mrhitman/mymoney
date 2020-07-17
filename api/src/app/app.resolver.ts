import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { LoginInput } from './input/login-input';
import { RefreshInput } from './input/refresh-input';

@Resolver()
export class AppResolver {
  constructor(
    private authService: AuthService,
    private localStrategy: LocalStrategy,
  ) {}

  @Mutation(() => LoginDto)
  async login(@Args('loginData') data: LoginInput) {
    const user = await this.localStrategy.validate(data.email, data.password);

    const tokens = await this.authService.login(user);
    return {
      ...tokens,
      profile: user,
    };
  }

  @Mutation(() => RefreshDto)
  async refresh(@Args('refreshData') data: RefreshInput) {
    return this.authService.refresh(data.refreshToken);
  }
}
