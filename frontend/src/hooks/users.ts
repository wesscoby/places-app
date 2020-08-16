import { useQuery } from 'react-query';

import { api } from '../util';


export function useGetAllUsers() {
  return useQuery("users", async () => {
    const { data } = await api.get("users");
    return data;
  });
}