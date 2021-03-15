import { Model } from 'objection';

export class RefreshToken extends Model {
  public userId: number;
  public token: string;
  public expireAt: Date;
  public createdAt: Date;

  static get idColumn() {
    return ['token'];
  }
  static get tableName() {
    return 'refresh_token';
  }
}

export default RefreshToken;
