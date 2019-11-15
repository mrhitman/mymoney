import { Model } from 'objection';

export class RefreshToken extends Model {
  public user_id: number;
  public token: string;
  public created_at: Date;

  static get idColumn() {
    return ['token'];
  }
  static get tableName() {
    return 'refresh_tokens';
  }
}

export default RefreshToken;
