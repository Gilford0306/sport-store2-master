import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);

  const login = (profile) => {
    setUserProfile(profile);
  };

  const logout = () => {
    setUserProfile(null);
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  };

  return (
    <UserContext.Provider value={{ userProfile, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
