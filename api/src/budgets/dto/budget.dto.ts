import { ObjectType, Field } from '@nestjs/graphql';
import { CategoryDto } from 'src/categories/dto/category.dto';

@ObjectType('BudgetCategory')
export class BudgetCategoryDto {
    @Field()
    readonly categoryId: string;

    @Field(() => CategoryDto)
    readonly category: CategoryDto;

    @Field()
    readonly amount: number;

    @Field()
    readonly progress: number;
}

@ObjectType('Budget')
export class BudgetDto {
    @Field()
    readonly id: string;

    @Field(() => [BudgetCategoryDto])
    readonly outcomes: BudgetCategoryDto[];

    @Field(() => Date)
    readonly date: Date;

    @Field(() => Date)
    readonly deadline: Date;
}