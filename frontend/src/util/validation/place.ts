import { object as Obj } from 'yup';

import { title, description } from './props';


export const newPlaceSchema = Obj().shape({
  title, description
});

export const updatePlaceSchema = Obj().shape({
  title, description
});