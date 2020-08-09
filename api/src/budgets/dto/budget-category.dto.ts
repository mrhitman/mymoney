import { ObjectType, Field } from '@nestjs/graphql';
import { CategoryDto } from 'src/categories/dto/category.dto';

@ObjectType('BudgetCategory')
export class BudgetCategoryDto {
    @Field()
    readonly categoryId: string;

    @Field()
    readonly category: CategoryDto;

    @Field()
    readonly amount: number;

    @Field()
    readonly progress: number;
}
