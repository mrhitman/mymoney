import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserDto } from 'src/users/dto/user.dto';

@ObjectType('Login')
export class LoginDto {
  @Field(() => ID)
  readonly accessToken: string;

  @Field()
  readonly refreshToken: string;

  @Field(() => UserDto)
  readonly profile: UserDto;
}
