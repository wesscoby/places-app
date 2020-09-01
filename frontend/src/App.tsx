import React, { FC } from 'react';
import { 
  BrowserRouter as Router } from 'react-router-dom';
import { ReactQueryDevtools as RQD } from 'react-query-devtools';
import {
  ReactQueryConfigProvider, ReactQueryProviderConfig
} from 'react-query';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MainNavigation } from './ui/components';
import { Routes } from './routes';
import { LoadScript } from '@react-google-maps/api';


const queryConfig: ReactQueryProviderConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false
  }
}

const libraries = ["places"];

toast.configure();
const App: FC = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <Router>
          <MainNavigation />
          <main>
            <Routes />
          </main>
          <RQD initialIsOpen={false}/>
        </Router>
      </LoadScript>
    </ReactQueryConfigProvider>
  );
}

export default App;
