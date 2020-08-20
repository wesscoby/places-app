import { 
  Controller, Get, Post, Body, Param, Patch,
  UseInterceptors
} from '@nestjs/common';
import { 
  ApiTags, ApiOperation, ApiParam, ApiBody
} from '@nestjs/swagger';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';

import { UserService } from './user.service';
import { User } from './user.model';
import { TransformInterceptor } from '../shared'
import { UpdateUserDTO, CreateUserDTO, UserDTO } from './user.dto';


@Controller('users')
@UseInterceptors(new TransformInterceptor())
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly users: UserService,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {}

  public toDto(user: User): UserDTO {
    return this.mapper.map(user, UserDTO, User);
  }

  public toDtoArray(users: User[]): UserDTO[] {
    return this.mapper.mapArray(users, UserDTO, User);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve list of all users' })
  async getAll(): Promise<UserDTO[]> {
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
  ): Promise<UserDTO> {
    const user = await this.users.getById(uid);
    return this.toDto(user);
  }

  @Patch(':uid')
  @ApiOperation({ 
    summary: 'Update a specific user by ID' 
  })
  @ApiParam({ name: 'uid', description: 'User ID' })
  @ApiBody({ type: UpdateUserDTO, description: 'Data to update' })
  async update(
    @Param('uid') uid: string,
    @Body() update: UpdateUserDTO
  ): Promise<UserDTO> {
    const updated = await this.users.update(uid, update);
    return this.toDto(updated);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user (temp)' })
  @ApiBody({ type: CreateUserDTO, description: 'New user data' })
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserDTO> {
    const user = await this.users.create(createUserDto);
    return this.toDto(user);
  }
}
