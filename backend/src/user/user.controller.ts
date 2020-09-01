import { 
  Controller, Get, Body, Param, Patch,
  UseInterceptors, Delete, Res, HttpStatus, BadRequestException
} from '@nestjs/common';
import { 
  ApiTags, ApiOperation, ApiParam, ApiBody, ApiNoContentResponse, ApiNotFoundResponse, ApiBadRequestResponse
} from '@nestjs/swagger';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';

import { UserService } from './user.service';
// import { TransformInterceptor } from '../shared'
import { UserModel, UpdateUserDto, User } from './models';
import { Auth, Role, ReqUser } from '../auth';


@Controller('users')
// @UseInterceptors(new TransformInterceptor())
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
  @ApiOperation({ summary: 'Get a specific user by ID' })
  @ApiParam({ name: 'uid', description: 'User ID' })
  async getOne(
    @Param('uid') uid: string
  ): Promise<User> {
    const user = await this.users.getById(uid);
    return this.toDto(user);
  }

  @Patch(':uid')
  @ApiOperation({
    summary: 'Update a specific user by ID'
  })
  @ApiParam({ name: 'uid', description: 'User ID' })
  @ApiBody({ type: UpdateUserDto, description: 'Data to update' })
  @Auth()
  async update(
    @Param('uid') uid: string,
    @Body() update: UpdateUserDto
  ): Promise<User> {
    const updated = await this.users.update(uid, update);
    return this.toDto(updated);
  }

  @Delete(':uid')
  @ApiOperation({ description: 'Delete a user from the system [ADMIN]' })
  @ApiParam({ name: 'uid', description: 'User ID' })
  @ApiNoContentResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Auth(Role.ADMIN)
  async deleteUser(
    @ReqUser('id') id: string,
    @Param('uid') uid: string,
    @Res() res
  ) {
    if(id !== uid) {
      await this.users.deleteUser(uid);
      return res.status(HttpStatus.NO_CONTENT).json({});
    } else {
      throw new BadRequestException(
        'You are not allowed to delete your own account'
      );
    }
  }
}
