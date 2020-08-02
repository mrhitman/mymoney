import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import { CurrentUser } from 'src/auth/current-user';
import User from 'src/database/models/user.model';
import { BankConnectionDto } from './dto/banks.dto';


@Resolver()
export class BanksResolver {
    @UseGuards(GqlAuthGuard)
    @Query(() => [BankConnectionDto])
    public async connections(
        @CurrentUser() user: User,
    ) {
        return user.connections;
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => String)
    public async connectMonobank(
        @CurrentUser() user: User,
        @Args('token') token: string,
    ) {
        await User.query().update({
            connections: [...user.connections.filter(c => !(c.type === 'mono' && c.token === token)), {
                type: 'monobank',
                token,
                date: new Date()
            }]
        }).findById(user.id);
        return 'OK';
    }

    @UseGuards(GqlAuthGuard)
    @Mutation((returns) => String)
    public async disconnectMonobank(
        @CurrentUser() user: User,
        @Args('token') token: string,
    ) {
        await User.query().update({
            connections: [...user.connections.filter(c => !(c.type === 'mono' && c.token === token))]
        }).findById(user.id);
        return 'OK';
    }
}