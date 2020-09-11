import { MouseEvent, ChangeEvent, FocusEvent } from 'react';


export interface LatLng {
  lat: number;
  lng: number;
}

export interface Place {
  id: string;
  title: string;
  description: string;
  address: string;
  coordinates: LatLng;
  image: string;
  creator: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  places: Place[];
}

export type OnClickEvent = (event: MouseEvent<HTMLElement>) => void;
export type onChangeEvent = (event: ChangeEvent<HTMLElement>) => void;
export type onBlurEvent = (event: FocusEvent<HTMLElement>) => void;

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string
}

export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: Role;
}

export interface AuthData {
  user: UserProfile;
  token: string;
}

export interface AddPlaceData {
  title: string;
  description: string;
  address: string;
  image?: string;
  coordinates?: LatLng;
}

export interface UpdatePlaceData {
  title?: string;
  description?: string;
}