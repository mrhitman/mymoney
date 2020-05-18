import { Injectable } from '@nestjs/common';
import User from 'src/database/models/user.model';

@Injectable()
export class UsersService {
  async findByEmail(email: string) {
    return User.query().where({ email }).first();
  }

  async findById(id: number) {
    return User.query().findById(id);
  }
}
