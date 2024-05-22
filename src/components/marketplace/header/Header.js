import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../../Auth/AuthProvider';
import AuthService from '../../../services/AuthService'
import UserService from '../../../services/UserService';
import './Header.css'; // Import CSS file for styling
import {AuthContext } from '../../../Auth/AuthProvider'
import { Link } from 'react-router-dom';

const Header = ({ onLoginButtonClick, onLogoutButtonClick }) => {
  const { logout } = useContext(AuthContext);
  // const [user, setUser] = useState(null);
  var user = UserService.getUserDataFromUserData();
  
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const userData = UserService.getUserDataFromUserData();
  //     setUser(userData);
  //   };

  //   fetchUserData();
  // }, []);

  const handleLogout = async () => {
    onLogoutButtonClick();
    await logout();
  };

  if (!user) {
    return (
      <header className="header">
        <nav className="nav-menu">
          <ul>
            <li>Marketplace</li>
            <li>My Orders</li>
            <li>My Account</li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button onClick={onLoginButtonClick}>Login</button>
          <button onClick={() => UserService.register('john.doe@example.com', 'password')}>Register</button>
        </div>
      </header>
    );
  }

  if(user.roles.includes('keeper')){
     return (
      <header className="header">
        <nav className="nav-menu">
          <ul>
            {!user.shopId && (
              <li><Link to="/create-shop">Create Shop</Link></li>
            )}
            {user.shopId && (
              <li><Link to="/my-shop">My Shop</Link></li>
            )}
            <li>My Orders</li>
            <li>My Account</li>
          </ul>
        </nav>
        <div className="user-info">
          <span>Welcome, {user.userName}!</span>
          <button className="sign-out-btn" onClick={handleLogout}>Sign Out</button>
        </div>
      </header>
    );
  }


  return (
    <header className="header">
      <nav className="nav-menu">
        <ul>
          <li>Marketplace</li>
          <li>My Orders</li>
          <li>My Account</li>
        </ul>
      </nav>
      <div className="user-info">
        <span>Welcome, {user.userName}!</span>
        <button className="sign-out-btn" onClick={handleLogout}>Sign Out</button>
      </div>
    </header>
  );
};

export default Header;
