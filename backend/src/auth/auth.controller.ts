import {
  Controller, UseGuards, Post, UseInterceptors, Get, Body, Patch
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiOperation, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { TransformInterceptor } from '../shared';
import { 
  LoginUserDto, CreateUserDto, UserProfile, UpdateUserDto 
} from '../user';
import { ReqUser, Auth } from './decorators';


@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(new TransformInterceptor())
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  @ApiOperation({ description: 'New User sign up' })
  @ApiBody({ type: () => CreateUserDto })
  async signup(@Body() user: CreateUserDto) {
    return await this.auth.signup(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ description: 'User login' })
  @ApiBody({ type: () => LoginUserDto })
  async login(@ReqUser() user) {
    return this.auth.login(user);
  }

  @Auth()
  @ApiOperation({ description: 'Get authenticated user profile' })
  @ApiOkResponse({ type: () => UserProfile })
  @Get('profile')
  async getProfile(@ReqUser('id') uid: string): Promise<UserProfile> {
    return await this.auth.getUserProfile(uid);
  }

  @Auth()
  @ApiOperation({ 
    description: 'Update authenticated user info [name, avatar]' 
  })
  @ApiBody({ type: () => UpdateUserDto })
  @ApiOkResponse({ type: () => UserProfile })
  @Patch('profile')
  async updateProfile(
    @ReqUser('id') uid: string,
    @Body() update: UpdateUserDto
  ): Promise<UserProfile> {
    return await this.auth.updateProfile(uid, update);
  }
}
