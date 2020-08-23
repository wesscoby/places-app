import { 
  AutoMapper, Profile, ProfileBase, mapWith, ignore 
} from 'nestjsx-automapper';

import {
  Place, Coordinates, PlacesModel, CoordinatesModel
} from './models';
import { UserModel, User } from '../user';


@Profile()
export class PlacesProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(CoordinatesModel, Coordinates);
    mapper
      .createMap(PlacesModel, Place)
      .forMember(destination => destination.coordinates, 
        mapWith(
          Coordinates,
          source => source.coordinates,
          () => CoordinatesModel
        )
      )
      .forMember(destination => destination.creator,
        mapWith(User,
          source => source.creator,
          () => UserModel
        )
      )
      .forMember(
        destination => destination.creator.places,
        ignore()
      )
  }
}