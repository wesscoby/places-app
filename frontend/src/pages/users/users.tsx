import React, { FC } from 'react';

import { UsersList } from '../../components';
import { useUsers } from '../../hooks';


const Users: FC = () => {
  const { error, isLoading, data } = useUsers();

  if(isLoading) return <p>Loading...</p>;
  if(error) return <p>An error occurred: {error?.message}</p>;

  return <UsersList items={data.users} />
}

export default Users;