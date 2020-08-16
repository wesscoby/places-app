import React, { FC, useContext } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { AuthContext } from '../context';
import { 
  Users, UserPlaces, NewPlace, UpdatePlace, Auth
} from '../pages';
import Authenticated from './authenticated';
import Public from './public';


const Routes: FC = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <Switch>
      <Public path="/" exact component={Users} />
      <Public 
        path="/:uid/places" exact 
        component={UserPlaces} 
      />
      <Authenticated 
        auth={isLoggedIn} 
        path="/places/new" exact 
        component={NewPlace} 
      />
      <Authenticated 
        auth={isLoggedIn} 
        path="/places/:pid" 
        component={UpdatePlace} 
      />
      <Public 
        path="/auth" exact 
        render={() => isLoggedIn ? <Redirect to="/" /> : <Auth />} 
      /> 
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;