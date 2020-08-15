import React from 'react';
import { 
  BrowserRouter as Router, Switch, Redirect, Route,
} from 'react-router-dom';
import { ReactQueryDevtools as RQD } from 'react-query-devtools';
import { 
  ReactQueryConfigProvider, ReactQueryProviderConfig 
} from 'react-query';

import { NewPlace, UserPlaces, Users, UpdatePlace } from './pages';
import { MainNavigation } from './components';


const queryConfig: ReactQueryProviderConfig = {
  queries: { refetchOnWindowFocus: false }
}

const App = () => {
  return (
    <Router>
      <ReactQueryConfigProvider config={queryConfig}>
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
      </ReactQueryConfigProvider>
    </Router>
  );
}

export default App;
