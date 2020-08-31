import React, { FC, useContext } from 'react';

import { PlaceList } from '../../components';
import { useGetPlacesByUser } from '../../../hooks';
import { AuthContext } from '../../../context';


interface ParamTypes {
  uid: string
}

const MyPlaces: FC = () => {
  const { user } = useContext(AuthContext);
  const { data, isLoading, isError, error } = useGetPlacesByUser(user!.id);

  if(isLoading) return <p>Loading...</p>;
  if(isError) return <p>Error! {error?.message}</p>;


  return <PlaceList items={data ?? []} />
}

export default MyPlaces;