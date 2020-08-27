import {
  Controller, UseGuards, Post, UseInterceptors, Get, Body, Patch
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { TransformInterceptor } from '../shared';
import {
  LoginUserDto, CreateUserDto, UserProfile, UpdateUserDto, UserModel
} from '../user';
import { ReqUser, Auth } from './decorators';


@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(new TransformInterceptor())
export class AuthController {
  constructor(
    private readonly auth: AuthService,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {}

  public toDto(user: UserModel): UserProfile {
    return this.mapper.map(user, UserProfile, UserModel);
  }

  @Post('signup')
  @ApiOperation({ description: 'New User sign up' })
  @ApiBody({ type: () => CreateUserDto })
  async signup(@Body() user: CreateUserDto) {
    return await this.auth.signup(user);
  }

  @Post('login')
  @ApiOperation({ description: 'User login' })
  @ApiBody({ type: () => LoginUserDto })
  @UseGuards(LocalAuthGuard)
  async login(@ReqUser() user) {
    return this.auth.login(user);
  }

  @Get('profile')
  @ApiOperation({ description: 'Get authenticated user profile' })
  @ApiOkResponse({ type: () => UserProfile })
  @Auth()
  async getProfile(@ReqUser('id') uid: string): Promise<UserProfile> {
    const user = await this.auth.getUserProfile(uid);
    return this.toDto(user);
  }

  @Patch('profile')
  @ApiOperation({
    description: 'Update authenticated user info [name, avatar]'
  })
  @ApiBody({ type: () => UpdateUserDto })
  @ApiOkResponse({ type: () => UserProfile })
  @Auth()
  async updateProfile(
    @ReqUser('id') uid: string,
    @Body() update: UpdateUserDto
  ): Promise<UserProfile> {
    const user = await this.auth.updateProfile(uid, update);
    return this.toDto(user);
  }
}
