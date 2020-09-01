import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { PlaceList, Spinner, Error } from '../../components';
import { useGetPlacesByUser } from '../../../hooks';


interface ParamTypes {
  uid: string;
}

const UserPlaces: FC = () => {
  const { uid } = useParams<ParamTypes>();
  const { data, isLoading, isError, error } = useGetPlacesByUser(uid);

  if(isLoading) return <Spinner asOverlay />;
  if(isError && error?.message === 'Not Found') return <Redirect to="404" />
  if(isError) return <Error error={error!} />;

  return <PlaceList items={data ?? []} />
}

export default UserPlaces;