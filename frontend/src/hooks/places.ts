import { useQuery, useMutation } from 'react-query';

import { api } from '../util';


export function useFetchPlaceById(pid: string) {
  return useQuery(["places", {pid}], async () => {
    const { data } = await api.get(`places/${pid}`);
    return data;
  });
}

export function useFetchPlacesByUserId(uid: string) {
  return useQuery(['places/user', {uid}], async() => {
    const { data } = await api.get(`places/user/${uid}`);
    return data;
  });
}

export function useNewPlaceMutation() {
  return useMutation(async (formData: any) => {
    await api.post('places', formData);
  });
}

export function useUpdatePlaceMutation(pid: string) {
  return useMutation(async (formData: any) => {
    await api.patch(`places/${pid}`, formData);
  });
}