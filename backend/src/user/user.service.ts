import { 
  Injectable, NotFoundException, UnauthorizedException, ConflictException 
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType as RMT } from '@typegoose/typegoose';

import { User, UserModel, CreateUserDto, UpdateUserDto } from './models';
import { comparePasswords } from './user.helper';
import { BaseService } from '../shared';


@Injectable()
export class UserService extends BaseService<UserModel> {
  constructor(
    @InjectModel(UserModel) private readonly users: RMT<typeof UserModel>
  ) {
    super(users);
  }

  async getByEmail(email: string): Promise<UserModel> {
    const user = await this._model.findOne({ email });
    if(!user) throw new NotFoundException();
    return user.toJSON();
  }

  async create(user: CreateUserDto): Promise<User> {
    try {
      const newUser = await this.users.findOrCreate(user);
      return newUser.doc.toJSON();
    } catch(error) {
      throw new ConflictException(
        `A user with email ${user.email} already exists`
      );
    }
  }

  async update(id: string, update: UpdateUserDto) {
    return await this.users.findByIdAndUpdate(id, update);
  }
  // TODO Add methods to add, update or delete `places` references

  async authenticateUser(
    email: string, password: string
  ): Promise<User | null> {
    const user = await this.users.findOne({ email });
    if(!user) return null;
    const same = await comparePasswords(password, user.password);
    if(!same) return null;

    return user.toJSON();
  }
}