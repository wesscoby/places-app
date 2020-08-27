import React, { FC } from 'react';
import { 
  BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools as RQD } from 'react-query-devtools';
import { 
  ReactQueryConfigProvider, ReactQueryProviderConfig 
} from 'react-query';

import { MainNavigation } from './ui/components';
import { Routes } from './routes';


const queryConfig: ReactQueryProviderConfig = {
  queries: { refetchOnWindowFocus: false }
}

const App: FC = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <Router>
        <MainNavigation />
        <main>
          <Routes />
        </main>
        <RQD initialIsOpen={false}/>
      </Router>
    </ReactQueryConfigProvider>
  );
}

export default App;
