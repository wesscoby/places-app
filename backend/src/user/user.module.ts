import { Module, forwardRef } from '@nestjs/common';
import { TypegooseModule as TM } from 'nestjs-typegoose';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { GravatarService } from './gravatar.service';
import { UserModel } from './models';
import './user.profile';
import { AuthModule } from '../auth';
import { PlacesModule } from '../places';


@Module({
  imports: [
    forwardRef(() => AuthModule),
    forwardRef(() => PlacesModule),
    TM.forFeature([UserModel])
  ],
  controllers: [UserController],
  providers: [UserService, GravatarService],
  exports: [UserService]
})
export class UserModule {}
