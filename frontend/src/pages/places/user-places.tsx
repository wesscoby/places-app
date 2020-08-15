import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { PlaceList } from '../../components';
import { useFetchPlacesByUserId } from '../../hooks';


interface ParamTypes {
  uid: string
}

const UserPlaces: FC = () => {
  const { uid } = useParams<ParamTypes>();
  const { data, isLoading, error } = useFetchPlacesByUserId(uid);

  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>Error! {error?.message}</p>;

  return <PlaceList items={data.places.length !== 0 ? data.places : []} />
}

export default UserPlaces;