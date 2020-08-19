import { 
  Injectable, NotFoundException, UnauthorizedException 
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType as RMT } from '@typegoose/typegoose';

import { User } from './user.model';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { comparePasswords } from './user.helper';
import { BaseService } from '../shared';


@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User) private readonly users: RMT<typeof User>
  ) {
    super(users);
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this._model.findOne({ email });
    if(!user) throw new NotFoundException();
    return user.toJSON();
  }

  async create(user: CreateUserDTO): Promise<User> {
    try {
      const newUser = await this.users.findOrCreate(user);
      return newUser.doc.toJSON();
    } catch(error) {
      throw new NotFoundException(error); // TODO DuplicateUserExeption
    }
  }

  async update(id: string, update: UpdateUserDTO) {
    return await this.users.findByIdAndUpdate(id, update);
  }

  async authenticateUser(
    email: string, password: string
  ): Promise<User> {
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