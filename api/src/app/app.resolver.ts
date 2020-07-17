import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/strategies/local.strategy';
import { LoginDto } from './dto/login.dto';
import { LoginInput } from './input/login-input';

@Resolver()
export class AppResolver {
  constructor(
    private authService: AuthService,
    private localStrategy: LocalStrategy,
  ) {}

  @Mutation(() => LoginDto)
  async login(@Args('loginData') data: LoginInput) {
    const user = await this.localStrategy.validate(data.email, data.password);

    return this.authService.login(user);
  }
}
