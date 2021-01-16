import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class Icon {
  @Field({ nullable: true })
  @IsString()
  readonly type: string;

  @Field({ nullable: true })
  @IsString()
  readonly name: string;

  @Field({ nullable: true })
  @IsString()
  readonly backgroundColor: string;

  @Field({ nullable: true })
  @IsString()
  readonly color: string;
}
