import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class BudgetCategoryCreate {
    @Field()
    @IsString()
    readonly categoryId: string;

    @Field()
    @IsNumber()
    readonly amount: number;

    @Field()
    @IsNumber()
    readonly progress: number;
}
