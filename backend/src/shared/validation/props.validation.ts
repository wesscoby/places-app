import { string as Str, object as Obj, number as Num } from 'yup';

import { Coordinates } from '../../places'


export const name = Str().trim().min(3).max(50);

export const password = Str().min(7).required();

export const avatar = Str().url().notOneOf(['', 'string']);

export const email = Str().email().required();

export const coordinates = Obj<Coordinates>().shape({
  lat: Num().required(),
  lng: Num().required()
});

export const title = Str().trim().min(10).max(50);

export const description = Str().trim().min(30).max(350);

export const address = Str().notOneOf(['', 'string']).required();

export const image = Str().url().required();