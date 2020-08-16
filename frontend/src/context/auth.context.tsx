import React, { FC, createContext, useState, useCallback } from 'react';


// TODO fix dummy auth context after backend is created
const contextData = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
}

export const AuthContext = createContext(contextData)

export const AuthContextProvider: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true)
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false)
  }, []) ;

  const { Provider } = AuthContext;

  return (
  <Provider value={{ isLoggedIn, login, logout }}>
    {children}
  </Provider>
  );
}