import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import {
  LoginData, SignupData, UserProfile, User, Place,
  AuthData, AddPlaceData, UpdatePlaceData
} from '../util';
import { CookieService } from '.';


class ApiService {
  private readonly BASE_URL: string = process.env.REACT_APP_API_URL!;
  private readonly pub: AxiosInstance; // Axios instance for public fetch
  private readonly auth: AxiosInstance;


  constructor() {
    const config: AxiosRequestConfig = {
      baseURL: this.BASE_URL
    };

    const interceptorResponseFn = (
      response: AxiosResponse<any>
    ): AxiosResponse<any> => response.data;

    const interceptorErrorFn = (error: any) => {
      return Promise.reject({
        status: error.response.status,
        statusText: error.response.data.message,
        message: error.response.statusText
      });
    };

    this.pub = axios.create(config);
    this.pub.interceptors.response.use(
      interceptorResponseFn, interceptorErrorFn
    );

    this.auth = axios.create(config);
    this.auth.interceptors.request.use(
      (config) => {
        const token = CookieService.getAccessToken();

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }, (err) => Promise.reject(err)
    );
    this.auth.interceptors.response.use(
      interceptorResponseFn, interceptorErrorFn
    );
  }

  getAllUsers = async(): Promise<User[]> => await this.pub.get("users");

  async getUserById(uid: string) {
    const { data } = await this.pub.get(`users/${uid}`);
    return data;
  }

  getPlacesByUser = async(
    uid: string
  ): Promise<Place[]> => await this.pub.get(`places/user/${uid}`);

  getAllPlaces = async(): Promise<Place[]> => await this.pub.get('places');

  getPlaceById = async(
    pid: string
  ): Promise<Place> => await this.pub.get(`places/${pid}`);

  userLogin = async(
    loginData: LoginData
  ): Promise<UserProfile> => {
    const authData: AuthData = await this.pub.post('auth/login', loginData);
    CookieService.setAccessToken(authData.token);
    return authData.user;
  };

  userSignup = async(
    signUpData: SignupData
  ): Promise<UserProfile> => {
    const authData: AuthData = await this.pub.post('auth/signup', signUpData);
    CookieService.setAccessToken(authData.token);
    return authData.user;
  }

  getUserProfile = async(): Promise<UserProfile | null> => {
    try {
      const user: UserProfile = await this.auth.get('auth/profile');
      return user;
    } catch(error) {
      return null;
    }
  }

  addPlace = async(
    data: AddPlaceData
  ): Promise<Place> => await this.auth.post('places', data);

  updatePlace = async(
    pid: string, data: UpdatePlaceData
  ): Promise<Place> => await this.auth.patch(`places/${pid}`, data);

  deletePlace = async(pid: string): Promise<string | null> => {
    try {
      await this.auth.delete(`places/${pid}`);
      return 'ok';
    } catch(error) {
      return null;
    }
  };
}

export default new ApiService();