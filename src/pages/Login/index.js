import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.scss';

export default function LoginPage({ isAuth }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  if (isAuth) return null;

  const handleSubmit = async event => {
    event.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/get_token`,
        {
          login: login,
          password: password,
        },
      );

      let { jwt } = response.data;

      if (jwt.startsWith('{') && jwt.endsWith('}')) {
        jwt = jwt.slice(1, -1);
      }

      localStorage.setItem('authToken', jwt);
      alert('Авторизация прошла успешно!');
      window.location.reload()
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Ошибка авторизации');
      } else {
        setError('Произошла ошибка. Попробуйте еще раз.');
      }
    }
  };

  return (
    <div className={styles.LoginModal}>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <input
          className={styles.Input}
          type="text"
          value={login}
          onChange={e => setLogin(e.target.value)}
          required
          placeholder="Введите логин"
        />
        <input
          className={`${styles.Input} ${styles.InputPassword}`}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          placeholder="Введите пароль"
        />
        {error && <div className={styles.Error}>{error}</div>}
        <div className={styles.Buttons}>
          <button className={styles.Button} type="submit">
            Войти
          </button>
          <Link className={styles.Button} to="/register">
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </div>
  );
}
