import { string as Str } from 'yup';


export const title = Str()
                      .min(10, 'Too short [Minimum length: 10 characters]')
                      .max(50, 'Too long [Maximum length: 50 characters]')
                      .required('Required');

export const description = Str()
                      .min(30, 'Too short [Minimum length: 50 characters]')
                      .max(350, 'Too long [Maximum length: 350 characters]')
                      .required('Required');

export const email = Str()
                      .email('Invalid Email')
                      .required('Required');

export const address = Str()
                        .max(50, 'Too long [Maximum length: 50 characters]')
                        .required('Required');

export const password = Str()
                          .min(7, 'Too short')
                          .required('Password required');

export const name = Str()
                    .min(3, 'Too short [Minimum length: 3 characters]')
                    .max(30, 'Too long [Maximum length: 30 characters]')
                    .required('Required');