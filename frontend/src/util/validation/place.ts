import { object as Obj } from 'yup';

import { title, description, address } from './props';


export const newPlaceSchema = Obj().shape({
  title, description, address
});

export const updatePlaceSchema = Obj().shape({
  title, description
});