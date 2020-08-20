import { 
  Injectable, NotFoundException, UnauthorizedException 
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType as RMT } from '@typegoose/typegoose';

import { UserModel, CreateUserDto, UpdateUserDto } from './models';
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

  async create(user: CreateUserDto): Promise<UserModel> {
    try {
      const newUser = await this.users.findOrCreate(user);
      return newUser.doc.toJSON();
    } catch(error) {
      throw new NotFoundException(error); // TODO DuplicateUserExeption
    }
  }

  async update(id: string, update: UpdateUserDto) {
    return await this.users.findByIdAndUpdate(id, update);
  }

  async authenticateUser(
    email: string, password: string
  ): Promise<UserModel> {
    try {
      const user = await this.getByEmail(email);
      const same = await comparePasswords(password, user.password);
      if(!same) throw new UnauthorizedException('Invalid credentials');
    return user;
    } catch(error) {
      throw new UnauthorizedException(error);
    }
  }
}