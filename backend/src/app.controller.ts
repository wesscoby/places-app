import { 
  Controller, Post, UseGuards, Request, Get, Body
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// import { LocalAuthGuard, JwtAuthGuard } from './auth/guards';
// import { AuthService } from './auth/auth.service';
import { CreateUserDto, LoginUserDto } from './user';


@Controller('auth')
@ApiTags('Auth')
export class AppController {
  // constructor(private readonly auth: AuthService) {}

  @Get('hello')
  async hello() {
    return 'hello world'
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // @ApiBasicAuth()
  // async login(@Request() req) {
  //   return this.auth.login(req.user);
  // }

  // @Post('signup')
  // async signup(@Body() user: CreateUserDto) {
  //   return await this.auth.signup(user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // async profile(@Request() req) {
  //   return req.user;
  // }
}
