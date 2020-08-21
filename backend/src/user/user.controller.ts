import { 
  Controller, Get, Post, Body, Param, Patch,
  UseInterceptors, UseGuards
} from '@nestjs/common';
import { 
  ApiTags, ApiOperation, ApiParam, ApiBody
} from '@nestjs/swagger';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';

import { UserService } from './user.service';
import { TransformInterceptor } from '../shared'
import { UserModel, UpdateUserDto, User } from './models';
import { Auth } from '../auth';


@Controller('users')
@UseInterceptors(new TransformInterceptor())
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly users: UserService,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {}

  public toDto(user: UserModel): User {
    return this.mapper.map(user, User, UserModel);
  }

  public toDtoArray(users: UserModel[]): User[] {
    return this.mapper.mapArray(users, User, UserModel);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve list of all users' })
  async getAll(): Promise<User[]> {
    const users = await this.users.getAll();
    return this.toDtoArray(users);
  }

  @Get(':uid')
  @ApiOperation({ 
    summary: 'Get a specific user by ID' 
  })
  @ApiParam({ name: 'uid', description: 'User ID' })
  async getOne(
    @Param('uid') uid: string
  ): Promise<User> {
    const user = await this.users.getById(uid);
    return this.toDto(user);
  }

  @Patch(':uid')
  @Auth()
  @ApiOperation({ 
    summary: 'Update a specific user by ID' 
  })
  @ApiParam({ name: 'uid', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto, description: 'Data to update' })
  async update(
    @Param('uid') uid: string,
    @Body() update: UpdateUserDto
  ): Promise<User> {
    const updated = await this.users.update(uid, update);
    return this.toDto(updated);
  }
}
