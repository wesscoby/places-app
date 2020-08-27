import React, { FC } from 'react';

import { UsersList } from '../../components';
import { useGetAllUsers } from '../../../hooks';


const Users: FC = () => {
  const { error, isLoading, data } = useGetAllUsers();

  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>An error occurred: {error?.message}</p>;

  return <UsersList items={data.users} />
}

export default Users;