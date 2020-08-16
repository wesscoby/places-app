import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';


interface AuthenticatedRouteProps extends RouteProps {
  auth: boolean; // TODO update with actual auth object
}

const Authenticated: FC<AuthenticatedRouteProps> = ({ 
  component, auth, ...rest
}) => { 
  return auth ?
    <Route {...rest} component={component} /> : 
    <Redirect to="/auth" />;
}

export default Authenticated;