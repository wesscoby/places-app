import { Module, Global } from '@nestjs/common';
import { TypegooseModule as TM } from 'nestjs-typegoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './models';
import './user.profile';

@Global()
@Module({
  imports: [TM.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
