import React, { FC } from 'react';
import { Route, RouteProps } from 'react-router-dom';


const Public: FC<RouteProps> = ({ path, component, ...rest }) => {
  return <Route path={path} component={component} {...rest} />
}

export default Public;