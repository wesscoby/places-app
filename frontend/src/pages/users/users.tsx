import React, { FC } from 'react';
import { useQuery } from 'react-query';

import { UsersList } from '../../components';


const fetchAllPlaces = async () => {
  let data = await fetch('/api/users');
  return data.json();
}

const Users: FC = () => {
  const { data, status, error } = useQuery('places', fetchAllPlaces, {
    refetchOnWindowFocus: false
  });

  if(status === "loading") return <p>Loading...</p>;
  if(status === "error") return <p>Error! {error?.message}</p>;

  return <UsersList items={data.users} />
}

export default Users;