import { useQuery, useMutation } from 'react-query';

import { ApiService } from '../services';
import { LoginData, SignupData } from '../util';

export function useGetAllUsers() {
  return useQuery("users", async () => await ApiService.getAllUsers());
}

export function useLoginUser() {
  return useMutation(
    async(login: LoginData) => await ApiService.userLogin(login)
  );
}

export function useRegisterUser() {
  return useMutation(
    async(userInfo: SignupData) => await ApiService.userSignup(userInfo)
  );
}

export function useGetUserProfile() {
  return useQuery('auth/profile', async() => await ApiService.getUserProfile());
}