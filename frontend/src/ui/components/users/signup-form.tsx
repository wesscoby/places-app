import React, { FC } from 'react';
import { Formik, Form } from 'formik';

import { signupSchema } from '../../../util';
import { Input, Button } from '..';


interface SignupSchema {
  name: string;
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const schemaValues: SignupSchema = {
    name: '',
    email: '',
    password: ''
  }

  return (
    <Formik
      initialValues={schemaValues}
      validationSchema={signupSchema}
      onSubmit={(
        { name, email, password }: SignupSchema,
        { setSubmitting }
      ) => {
        setSubmitting(true);
        console.log({ name, email, password });
        setSubmitting(false);
    }}
  >
    {({ isSubmitting, errors, isValid }) => (
      <>
        <Form>
          <Input
            label="Name"
            name="name"
            placeholder="Enter your full name"
            errorText={errors.name}
          />
          <Input
            label="Email"
            name="email"
            placeholder="Enter a valid email address"
            errorText={errors.email}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            errorText={errors.password}
          />
          <Button type="submit" disabled={isSubmitting || !isValid}>
            SIGNUP
          </Button>
        </Form>
      </>
    )}
  </Formik>
  );
}

export default LoginForm;