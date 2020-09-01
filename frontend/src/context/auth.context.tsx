import React, { FC, createContext, useState } from 'react';

import { UserProfile, Role } from '../util';
import { CookieService } from '../services';


interface Context {
  user: UserProfile | null;
  setUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  isAuthenticated: () => boolean;
  isAdmin: () => boolean;
  logout: () => void;
}

export const AuthContext = createContext<Context>({
  user: null,
  setUser(){},
  isAuthenticated: () => false,
  isAdmin: () => false,
  logout: () => {}
})

export const AuthContextProvider: FC = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const isAuthenticated = () => user ? true : false;
  const isAdmin = () => (user && user.role === Role.ADMIN) ? true : false;

  const logout = () => {
    CookieService.removeAccessToken();
    setUser(null);
  }

  const { Provider } = AuthContext;

  return (
  <Provider value={{ user, isAdmin, isAuthenticated, setUser, logout }}>
    {children}
  </Provider>
  );
}