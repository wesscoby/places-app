import React from 'react';
import { 
  BrowserRouter as Router, Switch, Redirect, Route,
} from 'react-router-dom';
import { ReactQueryDevtools as RQD } from 'react-query-devtools';

import { NewPlace, UserPlaces, Users, UpdatePlace } from './pages';
import { MainNavigation } from './components';


const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact component={Users} />
          <Route path="/:uid/places" exact component={UserPlaces} />
          <Route path="/places/new" exact component={NewPlace} />
          <Route path="/places/:pid" component={UpdatePlace} />
          <Redirect to="/" />
        </Switch>
      </main>
      <RQD initialIsOpen={false}/>
    </Router>
  );
}

export default App;
