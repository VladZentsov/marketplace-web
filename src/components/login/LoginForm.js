import React, { useState, useContext } from 'react';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthProvider';
import './LoginForm.css'; // Подключаем стили CSS

const LoginForm = ({ loginStateChange }) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(true); // Состояние для отображения/скрытия формы

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginButtAction = async (email, password) => {
    try {
      await login(email, password);
      await UserService.getUserData();
      loginStateChange();
      setShowLoginForm(false); // Скрыть форму после успешного входа
    } catch (error) {
      console.error('Ошибка входа:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginButtAction(email, password);
    // Перенаправляем пользователя на домашнюю страницу
    navigate('/');
    console.log('Отправка данных для входа:', { email, password });
  };

  return (
    // Используем классы стилей из CSS для стилизации формы
    <div className={`login-form-container ${showLoginForm ? 'visible' : 'hidden'}`}>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Пароль:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
