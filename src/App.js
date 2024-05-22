import logo from './logo.svg';
import './App.css';
import LoginForm from './components/login/LoginForm';
import HomePage from './components/marketplace/HomePage'
import AuthProvider  from './Auth/AuthProvider'
import Header from './components/marketplace/header/Header'
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginButtonClick = () => {
    setShowLoginForm(true);
  };

  const handleLogoutButtonClick = () =>{
    setIsLoggedIn(false);
  }

  const loginStateChange = (isLoggedIn) =>{
    setIsLoggedIn(true);
    setShowLoginForm(false);
  }

  
  return (

      <>
        <Header onLoginButtonClick={handleLoginButtonClick} onLogoutButtonClick = {handleLogoutButtonClick}/>
        {showLoginForm && <LoginForm loginStateChange = {loginStateChange}/>}
        <HomePage></HomePage>
      </>
  );
}

export default App;
