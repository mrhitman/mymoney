import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { PocketInput } from './pocket';

@InputType()
export class WalletUpdateInput {
  @Field()
  @IsString()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  type: string;

  @Field((type) => [PocketInput], { nullable: true })
  @IsOptional({ each: true })
  pockets: PocketInput[];

  @Field((type) => Int, { nullable: true })
  @IsOptional()
  @IsNumber()
  updatedAt: number;
}
