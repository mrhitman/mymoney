import { Field, ID, ObjectType, Float } from '@nestjs/graphql';
import { UserDto } from 'src/users/dto/user.dto';

@ObjectType('Login')
export class LoginDto {
  @Field((type) => ID)
  readonly accessToken: string;

  @Field()
  readonly refreshToken: string;

  @Field(() => UserDto)
  readonly profile: UserDto;
}
