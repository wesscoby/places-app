import { AutoMapper, Profile, ProfileBase, mapWith } from 'nestjsx-automapper';

import { User } from './user.model';
import { UserDTO } from './user.dto';
import { PlaceDTO, Place } from "../places";


@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
    .createMap(User, UserDTO)
    .forMember(destination => destination.places,
      mapWith(PlaceDTO, source => source.places,
        () => Place
      )
    );
  }
}