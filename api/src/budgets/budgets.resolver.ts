import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { BudgetsService } from './budgets.service';
import { BudgetDto } from './dto/budget.dto';
import { BudgetCategoryCreate } from './input/budget-category-create';

@Resolver()
export class BudgetsResolver {
    constructor(
        private readonly service: BudgetsService,
    ) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => [BudgetDto])
    public async budgets(@CurrentUser() user: User) {
        return this.service.getAll(user);
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => BudgetDto)
    public async budgetAddOutcomeCategory(
        @CurrentUser() user: User,
        @Args('categoryData') data: BudgetCategoryCreate) {
        return this.service.addOutcomeCategory(user, data);
    }
}