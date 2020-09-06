import React, { FC, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { SyncLoader } from 'react-spinners';

import { loginSchema, notify } from '../../../util';
import { Input, Button } from '..';
import { AuthContext } from '../../../context';
import { useLoginUser } from '../../../hooks';


interface LoginSchema {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const [
    userLogin, { reset }
  ] = useLoginUser();
  const { setUser, isAuthenticated } = useContext(AuthContext);

  const schemaValues: LoginSchema = {
    email: '',
    password: ''
  }

  const handleError = () => {
    notify('Invalid credentials. Try again', 'error', 3000);
    reset();
  }

  return (
    <>
      {isAuthenticated() && <Redirect to='/' />}
      <Formik
        initialValues={schemaValues}
        validationSchema={loginSchema}
        onSubmit={ async (
          { email, password }: LoginSchema,
          { setSubmitting }
        ) => {
          setSubmitting(true);
          const userProfile = await userLogin({ email, password });
          if(!userProfile) {
            handleError();
            setSubmitting(false);
          } else {
            setSubmitting(false);
            notify('Login Successful', 'success', 500);
            setTimeout(() => setUser(userProfile), 800);
          }
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
              {isSubmitting ? <SyncLoader size={10} /> : (
                <Button type="submit" disabled={!isValid}>
                  LOGIN
                </Button>
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;