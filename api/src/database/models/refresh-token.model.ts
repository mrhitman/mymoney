import { Model } from 'objection';

export class RefreshToken extends Model {
  public userId: number;
  public token: string;
  public createdAt: Date;

  static get idColumn() {
    return ['token'];
  }
  static get tableName() {
    return 'refresh_tokens';
  }
}

export default RefreshToken;
