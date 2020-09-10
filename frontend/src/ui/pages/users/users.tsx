import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';

import { UsersList, Spinner, Error } from '../../components';
import { useGetAllUsers } from '../../../hooks';


const Users: FC = () => {
  const { error, isLoading, isError, data } = useGetAllUsers();

  if(isLoading) return <Spinner asOverlay />;
  if(isError) return <Error error={error!} />;

  if(data!.length === 0) return (
    <Redirect to={"/auth"} />
  )

  return <UsersList items={data ?? []} />
}

export default Users;