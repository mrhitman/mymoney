import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import User from 'src/database/models/user.model';
import { BudgetDto } from './dto/budget.dto';
import { DataLoader } from 'src/dataloader';
import { categoryInId } from 'src/database/models/transaction.model';


@Resolver()
export class BudgetsResolver {
    constructor(private readonly loader: DataLoader) { }

    @UseGuards(GqlAuthGuard)
    @Query(() => [BudgetDto])
    public async budgets(@CurrentUser() user: User) {
        return [{
            id: '1',
            date: new Date(),
            deadline: new Date(),
            outcomes: [{
                categoryId: categoryInId,
                amount: 100,
                progress: 0
            }]
        }];
    }

}