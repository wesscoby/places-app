import { useQuery, useMutation } from 'react-query';

import { api } from '../util';


export function useFetchPlaceById(pid: string) {
  return useQuery(["places", {pid}], async () => {
    const { data } = await api.get(`places/${pid}`);
    return data;
  });
}

export function useGetPlacesByUser(uid: string) {
  return useQuery(['places/user', {uid}], async() => {
    const { data } = await api.get(`places/user/${uid}`);
    return data;
  });
}

export function useAddPlace() {
  return useMutation(async (formData: any) => {
    await api.post('places', formData);
  });
}

export function useUpdatePlace(pid: string) {
  return useMutation(async (formData: any) => {
    await api.patch(`places/${pid}`, formData);
  });
}

export function useDeletePlace(pid: string) {
  return useMutation(async () => {
    await api.delete(`places/${pid}`);
  });
}