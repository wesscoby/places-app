import React, { FC, useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { AuthContext } from '../context';


const Authorized: FC<RouteProps> = ({
  component, ...rest
}) => {
  const { isAdmin } = useContext(AuthContext);

  return isAdmin() ?
    <Route {...rest} component={component} /> :
    <Redirect to="/" />; // TODO Redirect to 403 unauthorized page
}

export default Authorized;