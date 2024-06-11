import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  token: '',
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthitchchContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const login = (newToken) => {
    setIsLoggedIn(true);
    setToken(newToken); // Set token on login
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(''); // Clear token on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
