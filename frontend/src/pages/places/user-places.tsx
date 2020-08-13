import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import { PlaceList } from '../../components';


interface ParamTypes {
  uid: string
}

const fetchPlacesByUser = async (uid: string) => {
  const res = await fetch(`/api/places/user/${uid}`);
  return res.json();
}

const UserPlaces: FC = () => {
  const { uid } = useParams<ParamTypes>();
  const { data, status, error } = useQuery(uid, fetchPlacesByUser, {
    refetchOnWindowFocus: false
  });

  if(status === "loading") return <p>Loading...</p>;
  if(status === "error") return <p>Error! {error?.message}</p>;

  return <PlaceList items={data.places.length !== 0 ? data.places : []} />
}

export default UserPlaces;