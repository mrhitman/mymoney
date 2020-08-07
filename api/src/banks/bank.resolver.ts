import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import BankConnector, { BankConnectorType } from 'src/database/models/bank-connector.model';
import User from 'src/database/models/user.model';
import { BankConnectionDto } from './dto/banks.dto';


@Resolver()
export class BanksResolver {
    @UseGuards(GqlAuthGuard)
    @Query(() => [BankConnectionDto])
    public async connections(
        @CurrentUser() user: User,
    ) {
        return []; // @TODO
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => String)
    public async connectMonobank(
        @CurrentUser() user: User,
        @Args('token') token: string,
    ) {
        const existConnection = await BankConnector
            .query()
            .where({ userId: user.id, meta: { token } });

        if (!existConnection) {
            await BankConnector.query().insert({
                userId: user.id,
                type: BankConnectorType.MONOBANK,
                meta: { token },
            });
        }

        return 'OK';
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => String)
    public async disconnectMonobank(
        @CurrentUser() user: User,
        @Args('token') token: string,
    ) {
        await BankConnector.query().delete().where({
            userId: user.id,
            type: BankConnectorType.MONOBANK,
            meta: { token },
        });
        return 'OK';
    }
}