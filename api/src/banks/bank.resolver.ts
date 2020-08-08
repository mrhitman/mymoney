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
    public async connectors(
        @CurrentUser() user: User,
    ) {
        const connectors = await BankConnector
            .query()
            .where({ userId: user.id })

        return connectors;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => String)
    public async connectMonobank(
        @CurrentUser() user: User,
        @Args('token') token: string,
    ) {
        const existConnection = await BankConnector
            .query()
            .where({ userId: user.id, meta: { token } })
            .first();

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

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => String)
    public async connectPrivat24(
        @CurrentUser() user: User,
        @Args('merchant_id') merchantId: string,
        @Args('password') password: string,
    ) {
        const existConnection = await BankConnector
            .query()
            .where({ userId: user.id, meta: { merchant_id: merchantId, password } })
            .first();

        if (!existConnection) {
            await BankConnector.query().insert({
                userId: user.id,
                type: BankConnectorType.PRIVAT24,
                meta: { merchant_id: merchantId, password },
            });
        }

        return 'OK';
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => String)
    public async disconnectPrivat24(
        @CurrentUser() user: User,
        @Args('merchant_id') merchantId: string,
    ) {
        const connectors = await BankConnector.query().where({
            userId: user.id,
            type: BankConnectorType.PRIVAT24,
        });

        await connectors
            .find(c => c.meta.merchant_id === merchantId)
            .$query()
            .delete()

        return 'OK';
    }

}