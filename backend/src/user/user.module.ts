import { Module, Global } from '@nestjs/common';
import { TypegooseModule as TM } from 'nestjs-typegoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.model';
import './user.profile';

@Global()
@Module({
  imports: [TM.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
