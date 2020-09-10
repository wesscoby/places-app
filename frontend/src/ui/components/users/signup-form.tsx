import React, { FC, useContext } from 'react';
import { Formik, Form } from 'formik';
import { Redirect } from 'react-router-dom';
import { ScaleLoader } from 'react-spinners';

import { signupSchema, notify } from '../../../util';
import { Input, Button } from '..';
import { useRegisterUser } from '../../../hooks';
import { AuthContext } from '../../../context';


interface SignupSchema {
  name: string;
  email: string;
  password: string;
}

const SignupForm: FC = () => {
  const [userSignup, { reset }] = useRegisterUser();
  const { setUser, isAuthenticated } = useContext(AuthContext);

  const schemaValues: SignupSchema = {
    name: '',
    email: '',
    password: ''
  }

  const handleError = () => {
    notify('Please check your credentials and try again', 'error', 3000);
    reset();
  }

  return (
    <>
      {isAuthenticated() && <Redirect to='/' />}
      <Formik
        initialValues={schemaValues}
        validationSchema={signupSchema}
        onSubmit={async(
          { name, email, password }: SignupSchema,
          { setSubmitting }
        ) => {
          setSubmitting(true);
          const userProfile = await userSignup({ name, email, password });
          if(!userProfile) {
            handleError();
            setSubmitting(false);
          } else {
            setSubmitting(false);
            notify('Signup Successful', 'success', 500);
            setTimeout(() => setUser(userProfile), 800);
          }
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
              {isSubmitting ? <ScaleLoader color="#ff0055" /> : (
                <Button type="submit" disabled={!isValid}>
                  SIGNUP
                </Button>
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}

export default SignupForm;