import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsBoolean } from 'class-validator';
import { PocketInput } from './pocket-input';

@InputType()
export class WalletUpdate {
  @Field()
  @IsString()
  readonly id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly type: string;

  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  readonly allowNegativeBalance: boolean;

  @Field((type) => [PocketInput], { nullable: true })
  @IsOptional({ each: true })
  readonly pockets: PocketInput[];

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  readonly updatedAt: number;
}
