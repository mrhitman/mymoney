import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { BudgetsService } from './budgets.service';
import { BudgetDto } from './dto/budget.dto';
import { BudgetCategoryCreate } from './input/budget-category-create';
import { BudgetUpdate } from './input/budget-update';

@Resolver()
export class BudgetsResolver {
  constructor(private readonly service: BudgetsService) { }

  @UseGuards(GqlAuthGuard)
  @Query(() => [BudgetDto])
  public async budgets(@CurrentUser() user: User) {
    return this.service.getAll(user);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => BudgetDto)
  public async activeBudget(@CurrentUser() user: User) {
    return this.service.getActiveBudget(user);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BudgetDto)
  public async updateBudget(@CurrentUser() user: User, @Args('updateBudget') data: BudgetUpdate) {
    return this.service.update(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BudgetDto)
  public async budgetAddOutcomeCategory(
    @CurrentUser() user: User,
    @Args('categoryData') data: BudgetCategoryCreate,
  ) {
    return this.service.addOutcomeCategory(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BudgetDto)
  public async budgetRemoveOutcomeCategory(
    @CurrentUser() user: User,
    @Args('categoryId') categoryId: string,
  ) {
    return this.service.removeOutcomeCategory(user, categoryId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BudgetDto)
  public async budgetAddIncomeCategory(
    @CurrentUser() user: User,
    @Args('categoryData') data: BudgetCategoryCreate,
  ) {
    return this.service.addIncomeCategory(user, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BudgetDto)
  public async budgetRemoveIncomeCategory(
    @CurrentUser() user: User,
    @Args('categoryId') categoryId: string,
  ) {
    return this.service.removeIncomeCategory(user, categoryId);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => BudgetDto)
  public async budgetCreateFromActiveTemplate(
    @CurrentUser() user: User,
  ) {
    return this.service.createBudgetFromActiveTemplate(user);
  }
}
