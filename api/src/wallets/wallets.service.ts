import { Injectable } from '@nestjs/common';
import User from 'src/database/models/user.model';
import Wallet from 'src/database/models/wallet.model';

@Injectable()
export class WalletsService {
  public async getAll(user: User) {
    return Wallet.query().where({ userId: user.id });
  }
}
