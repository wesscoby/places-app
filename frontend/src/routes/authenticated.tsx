import React, { FC, useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { AuthContext } from '../context';


const Authenticated: FC<RouteProps> = ({
  component, ...rest
}) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated() ?
    <Route {...rest} component={component} /> :
    <Redirect to="/auth" />;
}

export default Authenticated;