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