import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { BudgetDto } from './dto/budget.dto';


@Resolver()
export class BudgetsResolver {
    @UseGuards(GqlAuthGuard)
    @Query(() => [BudgetDto])
    public async budgets(@CurrentUser() user: User) {
        return [];
    }
}