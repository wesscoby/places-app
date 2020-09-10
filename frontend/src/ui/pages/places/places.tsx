import React, { FC } from 'react';

import { PlaceList, Spinner, Error } from '../../components';
import { useGetAllPlaces } from '../../../hooks';


const Places: FC = () => {
  const { error, isLoading, isError, data } = useGetAllPlaces();

  if(isLoading) return <Spinner asOverlay />;
  if(isError) return <Error error={error!} />

  return <PlaceList items={data ?? []} />
}

export default Places;