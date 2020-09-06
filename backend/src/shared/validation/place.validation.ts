import { object as Obj } from 'yup';

import {
  title, description, image, coordinates, address
} from './props.validation';
import { CreatePlaceDto, UpdatePlaceDto } from '../../places';


export const createPlaceSchema = Obj<CreatePlaceDto>().shape({
  title: title.required(),
  description: description.required(),
  coordinates: coordinates.required(),
  address, image
});

export const updatePlaceSchema = Obj<UpdatePlaceDto>().shape({
  title, description
});