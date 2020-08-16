import { object as Obj } from 'yup';

import { name, email, password } from './props';


export const loginSchema = Obj().shape({ email, password });
export const signupSchema = Obj().shape({ name, email, password });