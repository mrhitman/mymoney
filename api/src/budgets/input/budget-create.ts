import { Field, ID, InputType, Int } from '@nestjs/graphql';
import {
    IsBoolean,
    IsEnum,
    IsNumber,
    IsObject,
    IsOptional,
    IsString,
    IsDate,
} from 'class-validator';

@InputType()
export class BudgetCreate {
    @Field((type) => ID)
    @IsString()
    readonly id: string;

    @Field((type) => Date, { nullable: true })
    @IsDate()
    @IsOptional()
    readonly date: Date;

    @Field((type) => Int, { nullable: true })
    @IsNumber()
    @IsOptional()
    readonly createdAt: number;
}
