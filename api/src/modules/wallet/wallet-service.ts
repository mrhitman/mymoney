import { omit } from 'lodash';
import { BadRequest } from 'ts-httpexceptions';
import Wallet from '../../models/wallet';
import CreateWalletDto from './dto/create-wallet';
import UpdateWalletDto from './dto/update-wallet';

export class WalletProvider {
  public async create(dto: CreateWalletDto) {
    if (await Wallet.query().findById(dto.id)) {
      throw new BadRequest('Wallet already exists');
    }
    const wallet = await Wallet.query().insert({
      ...dto,
      last_sync: new Date(),
    });
    return wallet;
  }

  public async update(dto: UpdateWalletDto) {
    const wallet = await Wallet.query().findById(dto.id);
    if (!wallet) {
      throw new BadRequest('No such wallet');
    }
    wallet.$query().update({
      ...omit(dto, ['id']),
      last_sync: new Date(),
    });
    return wallet;
  }

  public async get(id?: string) {
    return id ? Wallet.query().findById(id) : Wallet.query();
  }

  public async getUserId(user_id: number) {
    return Wallet.query().where({ user_id });
  }

  public async delete(id: string) {
    return Wallet.query().deleteById(id);
  }
}

export default WalletProvider;
