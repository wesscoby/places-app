import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { 
  UserService, User, CreateUserDto, UserProfile, UpdateUserDto, UserModel 
} from '../user';
import { Payload, AuthDto } from './models';


@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private users: UserService,
    private jwt: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    return this.users.authenticateUser(email, password);
  }

  async login({ id, email, role, name, avatar }: User): Promise<AuthDto> {
    const payload: Payload = { sub: id, email, role };

    return {
      user: { id, name, email, avatar, role },
      token: this.jwt.sign(payload),
    };
  }

  async signup(user: CreateUserDto) {
    const newUser = await this.users.create(user);
    return await this.login(newUser);
  }

  async getUserProfile(uid: string): Promise<UserModel> {
    return await this.users.getById(uid);
  }

  async updateProfile(
    uid: string, update: UpdateUserDto
  ): Promise<UserModel> {
    return await this.users.update(uid, update);
  }
}
