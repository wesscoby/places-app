import { AutoMapper, Profile, ProfileBase } from 'nestjsx-automapper';

import { User } from './user.model';
import { UserDTO } from './user.dto';


@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(User, UserDTO);
  }
}