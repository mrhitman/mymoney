import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsInt, IsString } from 'class-validator';
import graphqlTypeJson from 'graphql-type-json';

@InputType('AddConnectorArgs')
export class AddConnectorDto {
  @Field()
  @IsInt()
  readonly interval: number;

  @Field()
  @IsBoolean()
  readonly enabled: boolean;

  @Field(() => graphqlTypeJson)
  readonly params: any;

  @Field()
  @IsString()
  readonly type: string;
}
