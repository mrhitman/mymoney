import { UseGuards } from '@nestjs/common';
import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { BudgetDto } from './dto/budget.dto';
import { DataLoader } from 'src/dataloader';
import { categoryInId } from 'src/database/models/transaction.model';
import { BudgetCategoryCreate } from './input/budget-category-create';

let pupet = {
    id: '1',
    date: new Date(),
    deadline: new Date(),
    outcomes: [{
        categoryId: categoryInId,
        amount: 100,
        progress: 0
    }]
};

@Resolver()
export class BudgetsResolver {
    constructor(private readonly loader: DataLoader) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => [BudgetDto])
    public async budgets(@CurrentUser() user: User) {
        return [pupet];
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => BudgetDto)
    public async budgetAddOutcomeCategory(
        @CurrentUser() user: User,
        @Args('categoryData') data: BudgetCategoryCreate) {

        pupet = { ...pupet, outcomes: [...pupet.outcomes, data] }
        return pupet;
    }
}