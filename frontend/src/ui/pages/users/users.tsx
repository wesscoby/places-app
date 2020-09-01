import React, { FC } from 'react';

import { UsersList, Spinner, Error } from '../../components';
import { useGetAllUsers } from '../../../hooks';


const Users: FC = () => {
  const { error, isLoading, isError, data } = useGetAllUsers();

  if(isLoading) return <Spinner asOverlay />;
  if(isError) return <Error error={error!} />

  return <UsersList items={data ?? []} />
}

export default Users;