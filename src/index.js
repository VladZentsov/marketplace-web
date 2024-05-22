import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Auth/AuthProvider';
import HomePage from './components/marketplace/HomePage'
import LoginForm from './components/login/LoginForm';
import CreateShopForm from './components/marketplace/keeper/createShopForm/CreateShopForm';
import MyShopPage from './components/marketplace/keeper/myShop/MyShopPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CreateProductForm from './components/marketplace/keeper/myShop/CreateProductForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>

      <Routes >
        <Route path="/login" element={<LoginForm />} />
        <Route path="/create-shop" element={<CreateShopForm />} />
        <Route path="/my-shop" element={<MyShopPage />} />
        <Route path="/create-product" element={<CreateProductForm />} />
        {/* <Route path="/homePage" element={<HomePage/>} /> */}
        {/* <Route path="/" element={isLoggedIn ? <Navigate to="/homePage" /> : <Navigate to="/login" />} /> */}
      </Routes >
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
