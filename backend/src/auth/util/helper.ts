import { Role } from '../models';
import { Place } from '../../places';


export const isOwnPlace = (
  uid: string, place: Place
) => uid === place.creator.id;