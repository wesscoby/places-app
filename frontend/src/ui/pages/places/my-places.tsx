import React, { FC, useContext } from 'react';

import { PlaceList, Spinner, Error } from '../../components';
import { useGetPlacesByUser } from '../../../hooks';
import { AuthContext } from '../../../context';


interface ParamTypes {
  uid: string
}

const MyPlaces: FC = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError, error } = useGetPlacesByUser(user!.id);

  if(isLoading) return <Spinner asOverlay />;
  if(isError) return <Error error={error!} />;


  return <PlaceList items={data ?? []} />
}

export default MyPlaces;