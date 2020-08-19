import { AutoMapper, Profile, ProfileBase, mapWith } from 'nestjsx-automapper';

import { Place, Location } from './places.model';
import { PlaceDTO, LocationDTO } from './places.dto';


@Profile()
export class PlacesProfile extends ProfileBase {
  constructor(mapper: AutoMapper) {
    super();
    mapper.createMap(Location, LocationDTO);
    mapper
      .createMap(Place, PlaceDTO)
      .forMember(destination => destination.location, 
        mapWith(
          LocationDTO,
          source => source.location,
          () => Location
        )
      );
  }
}