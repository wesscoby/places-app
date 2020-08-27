import { AutoMapper, Profile, ProfileBase, mapWith } from 'nestjsx-automapper';

import { UserModel, User, UserProfile as UserProfileDto } from './models';
import { Place, PlacesModel } from "../places";


@Profile()
export class UserProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper
    .createMap(UserModel, User)
    .forMember(destination => destination.places, mapWith(
      Place, source => source.places, () => PlacesModel
    ));

    mapper.createMap(UserModel, UserProfileDto);
  }
}