import { object as Obj } from 'yup';

import { name, email, password, avatar } from './props.validation';
import { CreateUserDto, UpdateUserDto } from '../../user';


export const createUserSchema = Obj<CreateUserDto>().shape({
  name: name.required(),
  email, avatar, password
});

export const updateUserSchema = Obj<UpdateUserDto>().shape({
  name, avatar
});