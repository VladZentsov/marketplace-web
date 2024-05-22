// AuthProvider.js
import configData from "../config.json";
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocalStorageService from "../services/LocalStorageService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password, useCookies=true, useSessionCookies=true) => {
    try {
      const response = await fetch(configData.SERVER_URL+'/login?useCookies='+useCookies+'&'+'useSessionCookies='+useSessionCookies, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        setIsAuthenticated(true);
        LocalStorageService.saveItemToLocalStorage('isLoggedIn', true);
        navigate('/');
        return true;
      } else {
        throw new Error('Ошибка входа');
      }
    } catch (error) {
      console.error('Ошибка входа:', error.message);
      return false;
    }
  };

  const logout = async () => {
    try {
      LocalStorageService.removeItemFromLocalStorage('user');
      const response = await fetch(configData.SERVER_URL+'/logout', {
        method: 'Get',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      if (response.ok) {
        setIsAuthenticated(false);
        navigate('/login');
      } else {
        throw new Error('Ошибка выхода');
      }
    } catch (error) {
      console.error('Ошибка выхода:', error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
