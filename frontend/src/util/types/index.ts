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
  location: LatLng;
  image: string;
  user: string | User;
}

export interface User {
  id: string;
  name?: string;
  email: string;
  image: string;
  places: Place[] | string[];
}

export type OnClickEvent = (event: MouseEvent<HTMLElement>) => void;
export type onChangeEvent = (event: ChangeEvent<HTMLElement>) => void;
export type onBlurEvent = (event: FocusEvent<HTMLElement>) => void;