import { compareSync, hash } from 'bcrypt';
import { omit } from 'lodash';
import { BadRequest, NotFound } from 'ts-httpexceptions';
import User from '../../models/user';
import CreateUserDto from './dto/create-user';
import LoginDto from './dto/login';
import UpdateUserDto from './dto/update-user';

export class UserProvider {
  public async create(dto: CreateUserDto) {
    if (await User.query().findOne({ email: dto.email })) {
      throw new BadRequest('User already exists');
    }

    const user = await User.query().insert({
      email: dto.email,
      first_name: dto.first_name,
      middle_name: dto.middle_name,
      last_name: dto.last_name,
      password: await hash(dto.password, 10),
      last_sync: new Date(),
    });
    return omit(user, ['password']);
  }

  public async update(dto: UpdateUserDto) {
    const user = await User.query().findOne({ email: dto.email });

    if (!user) {
      throw new NotFound('No such user found');
    }

    await user.$query().update({ last_sync: new Date() });
    return omit(user, ['password']);
  }

  public async get(id?: number) {
    return id
      ? User.query()
          .omit(['password'])
          .findById(id)
      : User.query().omit(['password']);
  }

  public async delete(id: number) {
    return User.query().deleteById(id);
  }

  public async login(dto: LoginDto) {
    const { email, password } = dto;
    const user = await User.query().findOne({ email });

    if (!user) {
      throw new BadRequest('Invalid email or password');
    }

    if (!compareSync(String(password), user.password)) {
      throw new BadRequest('Invalid email or password');
    }

    return {
      user: omit(user, ['password']),
    };
  }
}

export default UserProvider;
