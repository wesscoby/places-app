import { 
  Injectable, NotFoundException, ConflictException, Inject, forwardRef 
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType as RMT } from '@typegoose/typegoose';

import { User, UserModel, CreateUserDto, UpdateUserDto } from './models';
import { comparePasswords } from './user.helper';
import { BaseService } from '../shared';
import { PlacesService as PS } from '../places';


@Injectable()
export class UserService extends BaseService<UserModel> {
  constructor(
    @InjectModel(UserModel) private readonly users: RMT<typeof UserModel>,
    @Inject(forwardRef(() => PS)) private readonly places: PS
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

  async update(
    uid: string, { name, avatar }: UpdateUserDto
  ): Promise<UserModel> {
    const user = await this.users.findById(this.ID(uid));
    user.name = name ?? user.name;
    user.avatar = avatar ?? user.avatar;
    await user.save();
    return user.toJSON();
  }

  async authenticateUser(
    email: string, password: string
  ): Promise<User | null> {
    const user = await this.users.findOne({ email });
    if(!user) return null;
    const same = await comparePasswords(password, user.password);
    if(!same) return null;

    return user.toJSON();
  }

  async deleteUser(uid: string) {
    try {
      const user = await this.users.findOne({ _id: this.ID(uid) });

      if(!user) throw new NotFoundException(
        `User with id ${uid} does not exist`
      );
      await this.places.db.deleteMany({ creator: user._id });
      await user.remove();
    } catch(error) {
      throw new NotFoundException(error.message);
    }
  }
}