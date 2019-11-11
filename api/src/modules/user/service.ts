import { hash } from 'bcrypt';
import User from 'src/models/user';
import { BadRequest, NotFound } from 'ts-httpexceptions';
import CreateUserDto from './dto/CreateUserDto';
import UpdateUserDto from './dto/UpdateUserDto';
import { userInfo } from 'os';

export class UserProvider {
  public async create(dto: CreateUserDto) {
    if (await User.query().findOne({ email: dto.email })) {
      throw new BadRequest('User already exists');
    }

    return User.query().insert({
      email: dto.email,
      first_name: dto.first_name,
      middle_name: dto.middle_name,
      last_name: dto.last_name,
      password: await hash(dto.password, 10),
      last_sync: new Date(),
    });
  }

  public async update(dto: UpdateUserDto) {
    const user = await User.query().findOne({ email: dto.email });

    if (!user) {
      throw new NotFound('No such user found');
    }

    await user.$query().update({ last_sync: new Date() });
    return user;
  }

  public async get() {
    return User.query();
  }
}

export default UserProvider;
