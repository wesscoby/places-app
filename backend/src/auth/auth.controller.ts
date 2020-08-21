import {
  Controller, UseGuards, Post, UseInterceptors, Get, Body
} from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { TransformInterceptor } from '../shared';
import { LoginUserDto, CreateUserDto } from '../user';
import { ReqUser, Auth } from './decorators';


@Controller('auth')
@ApiTags('Auth')
@UseInterceptors(new TransformInterceptor())
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('signup')
  @ApiBody({ type: () => CreateUserDto })
  async signup(@Body() user: CreateUserDto) {
    return await this.auth.signup(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: () => LoginUserDto })
  async login(@ReqUser() user) {
    return this.auth.login(user);
  }

  @Auth()
  @Get('profile')
  getProfile(@ReqUser() user) {
    return user;
  }
}
