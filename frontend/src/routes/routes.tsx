import React, { FC, useContext, useEffect } from 'react';
import { Switch } from 'react-router-dom';

import Public from './public';
import Authenticated from './authenticated';
import {
  Users, UserPlaces, NewPlace, UpdatePlace, Auth,
  Places, MyPlaces, FourOhFour
} from '../ui/pages';
import { useGetUserProfile } from '../hooks';
import { AuthContext } from '../context';


const Routes: FC = () => {
  //? Hack to persist user login
  const { setUser } = useContext(AuthContext);
  const { data } = useGetUserProfile();

  useEffect(() => {
    setUser(data ?? null);
  }, [data, setUser])

  return (
    <Switch>
      <Public path="/" exact component={Places} />
      <Public path="/users" exact component={Users} />
      <Public
        path="/:uid/places" exact
        component={UserPlaces}
      />
      <Authenticated path="/my-places" component={MyPlaces} />
      <Authenticated
        path="/places/new" exact 
        component={NewPlace}
      />
      <Authenticated
        path="/places/:pid" 
        component={UpdatePlace}
      />
      <Public
        path="/auth" exact
        component={Auth}
      />
      <Public component={FourOhFour} />
    </Switch>
  );
}

export default Routes;