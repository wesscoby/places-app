import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { 
  UserService, User, CreateUserDto, UserProfile, UpdateUserDto, UserModel 
} from '../user';
import { Payload } from './models';


@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService)) private users: UserService,
    private jwt: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    return this.users.authenticateUser(email, password);
  }

  async login({ id, email, role }: User) {
    const payload: Payload = { sub: id, email, role };
    return {
      success: true,
      token: this.jwt.sign(payload),
    };
  }

  async signup(user: CreateUserDto) {
    const newUser = await this.users.create(user);
    return await this.login(newUser);
  }

  async getUserProfile(uid: string): Promise<UserProfile> {
    const { id, name, email, avatar, role } = await this.users.getById(uid);
    return { id, name, email, avatar, role };
  }

  async updateProfile(
    uid: string, update: UpdateUserDto
  ): Promise<UserProfile> {
    const {
      id, name, email, avatar, role 
    } = await this.users.update(uid, update);
    return { id, name, email, avatar, role };
  }
}
