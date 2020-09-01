import React, { FC, useState } from 'react';

import { 
  Card, LoginForm, SignupForm, Button 
} from '../../components';


const Auth: FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const loginSignupToggle = () => {
    setIsLoginMode(prevState => !prevState);
  }

  return (
    <Card className="authentication">
      <h2>{isLoginMode ? 'Login' : 'New Member'}</h2>
      <hr/>
      {isLoginMode ? <LoginForm /> : <SignupForm />}
      <Button inverse onClick={loginSignupToggle}>
        {`SWITCH TO ${isLoginMode ? 'SIGNUP' : 'LOGIN'}`}
      </Button>
    </Card>
  );
}

export default Auth;