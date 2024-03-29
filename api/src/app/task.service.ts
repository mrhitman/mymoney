import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import Transaction from '../database/models/transaction.model';
import WalletHistory from '../database/models/wallet-history.model';
import Wallet from '../database/models/wallet.model';

@Injectable()
export class TaskService {
  @Cron('0 * * * * *')
  public pullAndResolveRecurrentTransactions() {
    Logger.log('Called when the current second every 1 minute ', 'TaskService');
  }

  @Cron('0 */5 * * * *')
  public async pushRecurrentTransactions() {
    const transactions = await Transaction.query().where({
      isTemplate: true,
      isAutoGenerated: false,
    });

    Logger.log(
      'Called when the current second every 5 minute ' + ' ' + JSON.stringify(transactions),
      'TaskService',
    );
  }

  @Cron('0 0 0 * * *')
  public async createWalletHistory() {
    Logger.log('Create wallet history every day', 'TaskService');
    const batchSize = 100;
    let offset = 0;
    let wallets = [];

    do {
      wallets = await Wallet.query().limit(batchSize).offset(offset);
      offset += batchSize;

      await WalletHistory.query().insert(
        wallets.map((wallet) => ({
          walletId: wallet.id,
          userId: wallet.userId,
          pockets: wallet.pockets,
        })),
      );
    } while (wallets.length < batchSize);
  }
}
