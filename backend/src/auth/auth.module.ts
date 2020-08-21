import { Module, forwardRef } from '@nestjs/common';
import { PassportModule as PM } from '@nestjs/passport';
import { JwtModule as JM } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy } from './strategies';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { UserModule } from '../user';


const passportConfig = { defaultStrategy: 'jwt' };

const jwtConfig = {
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '3600s' },
};

@Module({
  imports: [
    forwardRef(() => UserModule),
    PM.register(passportConfig),
    JM.register(jwtConfig),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [PM, AuthService],
})
export class AuthModule {}
