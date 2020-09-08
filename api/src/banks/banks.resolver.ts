import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.quard';
import BankConnector, { BankConnectorType } from 'src/database/models/bank-connector.model';
import User from 'src/database/models/user.model';
import { BankConnectionDto } from './dto/banks.dto';
import { Privat24Provider } from './privat24.provider';
import { MonobankProvider } from './monobank.provider';
import { AddConnectorDto } from './input/connect.dto';

@Resolver()
export class BanksResolver {
  constructor(private mono: MonobankProvider, private privat24: Privat24Provider) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => [BankConnectionDto])
  public async connectors(@CurrentUser() user: User) {
    const connectors = await BankConnector.query().where({ userId: user.id });

    return connectors;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => String)
  public async import(@CurrentUser() user: User, @Args('id') id: string) {
    const connector = await BankConnector.query().where({ userId: user.id }).findById(id);

    switch (connector.type) {
      case BankConnectorType.MONOBANK:
        await this.mono.import(user, connector.meta.token);
        break;
      case BankConnectorType.PRIVAT24:
        await this.privat24.import(user, connector.meta.merchant_id, connector.meta.password);
        break;
    }
    return 'ok';
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => String)
  public async addConnector(@CurrentUser() user: User, @Args('args') args: AddConnectorDto) {
    const type = args.type.toLowerCase();
    switch (type) {
      case 'monobank':
        return this.connectMonobank(user, args.params?.token);
      case 'privat24':
        return this.connectPrivat24(user, args.params?.merchantId, args.params?.password);
      default:
        return 'no such connector type';
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => String)
  public async removeConnector(@CurrentUser() user: User, @Args('id') id: number) {

    const connector = await BankConnector
      .query()
      .where({ userId: user.id})
      .deleteById(id)

    return JSON.stringify(connector, null, '\t')
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => String)
  public async connectMonobank(@CurrentUser() user: User, @Args('token') token: string) {
    const existConnection = await BankConnector.query()
      .where({ userId: user.id, meta: { token } })
      .first();

    if (!existConnection) {
      await BankConnector.query().insert({
        userId: user.id,
        type: BankConnectorType.MONOBANK,
        meta: { token },
      });
      await this.mono.import(user, token);
    }

    return 'OK';
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => String)
  public async disconnectMonobank(@CurrentUser() user: User, @Args('token') token: string) {
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
    const existConnection = await BankConnector.query()
      .where({ userId: user.id, meta: { merchant_id: merchantId, password } })
      .first();

    if (!existConnection) {
      await BankConnector.query().insert({
        userId: user.id,
        type: BankConnectorType.PRIVAT24,
        meta: { merchant_id: merchantId, password },
      });
      await this.privat24.import(user, merchantId, password);
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
      .find((c) => c.meta.merchant_id === merchantId)
      .$query()
      .delete();

    return 'OK';
  }
}
