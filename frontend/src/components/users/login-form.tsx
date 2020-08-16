import React, { FC, useContext } from 'react';
import { Formik, Form } from 'formik';
// import { useHistory } from 'react-router-dom';

import { loginSchema } from '../../util';
import { Input, Button } from '..';
import { AuthContext } from '../../context';


// TODO Change Login simulation
interface LoginSchema {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  // const history = useHistory();
  const { login } = useContext(AuthContext);

  const schemaValues: LoginSchema = {
    email: '',
    password: ''
  }

  return (
    <Formik
      initialValues={schemaValues}
      validationSchema={loginSchema}
      onSubmit={(
        { email, password }: LoginSchema,
        { setSubmitting }
      ) => {
        setSubmitting(true);
        console.log({ email, password });
        login();
        setSubmitting(false);
    }}
  >
    {({ isSubmitting, errors, isValid }) => (
      <>
        <Form>
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
            LOGIN
          </Button>
        </Form>
      </>
    )}
  </Formik>
  );
}

export default LoginForm;