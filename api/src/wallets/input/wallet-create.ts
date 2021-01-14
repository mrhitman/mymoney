import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { PocketInput } from './pocket-input';

@InputType()
export class WalletCreate {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly id: string;

  @Field()
  @IsString()
  readonly name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly image: string;

  @Field({ nullable: true, defaultValue: 'credit' })
  @IsOptional()
  @IsString()
  readonly type: string;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  @IsOptional()
  @IsBoolean()
  readonly allowNegativeBalance: boolean;

  @Field(() => [PocketInput], { nullable: true, defaultValue: [] })
  @IsOptional()
  readonly pockets: PocketInput[];

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly createdAt: number;
}
