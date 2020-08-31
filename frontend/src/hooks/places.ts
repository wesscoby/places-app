import { useQuery, useMutation } from 'react-query';

import { AddPlaceData, UpdatePlaceData } from '../util';
import { ApiService } from '../services';


export function useFetchPlaceById(pid: string) {
  return useQuery(
    ["places", {pid}],
    async () => await ApiService.getPlaceById(pid)
  );
}

export function useGetPlacesByUser(uid: string) {
  return useQuery(
    ['places/user', {uid}], async() => await ApiService.getPlacesByUser(uid)
  );
}

export function useAddPlace() {
  return useMutation(
    async (formData: AddPlaceData) => await ApiService.addPlace(formData)
  );
}

export function useUpdatePlace(pid: string) {
  return useMutation(
    async (data: UpdatePlaceData) => await ApiService.updatePlace(pid, data)
  );
}

export function useDeletePlace(pid: string) {
  return useMutation(
    async () => await ApiService.deletePlace(pid)
  );
}