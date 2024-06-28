import { useEffect, useState } from 'react';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterPage({ isAuth }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [email, setEmail] = useState('');
  const [formEducation, setFormEducation] = useState('');
  const navigate = useNavigate();

  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState('ПМ 20');

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/regist/get_speciality`,
        );

        setSpecialities(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSpecialities();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (password === confirmPassword) {
        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/regist/registr_user`,
          {
            login: login,
            password: password,
            surname: surname,
            name: name,
            patronymic: patronymic,
            email: email,
            form_education: formEducation,
            speciality: specialities.find(
              speciality => speciality.name === selectedSpeciality,
            )?.uid,
          },
        );

        alert(
          'Вы успешно зарегистрировались! Пожалуйста, войдите в свой профиль.',
        );
        navigate('/');
      } else {
        alert('Пароли не совпадают');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  if (isAuth) return null;

  return (
    <div className={styles.RegisterModal}>
      <h2 className={styles.Title}>Зарегистрируйтесь</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.Section}>
          <div className={styles.LabelWrapper}>
            <label className={styles.Label} htmlFor="login">
              Логин
            </label>
            <label className={styles.Label} htmlFor="password">
              Пароль
            </label>
            <label className={styles.Label} htmlFor="confirm-password">
              Повторите пароль
            </label>
          </div>
          <div className={styles.InputWrapper}>
            <input
              className={styles.Input}
              value={login}
              onChange={e => setLogin(e.target.value)}
              type="text"
              id="login"
              required
            />
            <input
              className={`${styles.Input} ${styles.InputPassword}`}
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              id="password"
              required
            />
            <input
              className={`${styles.Input} ${styles.InputPassword}`}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              type="password"
              id="confirm-password"
              required
            />
          </div>
        </div>
        <div className={styles.Section}>
          <div
            className={`${styles.LabelWrapper} ${styles.LabelWrapperMoreInfo}`}
          >
            <label className={styles.Label} htmlFor="surname">
              Фамилия
            </label>
            <label className={styles.Label} htmlFor="name">
              Имя
            </label>
            <label className={styles.Label} htmlFor="patronymic">
              Отчество
            </label>
            <label className={styles.Label} htmlFor="email">
              Email
            </label>
            <label className={styles.Label} htmlFor="form_education">
              Форма обучения
            </label>
            <label className={styles.Label} htmlFor="speciality">
              Группа
            </label>
          </div>
          <div className={styles.InputWrapper}>
            <input
              className={styles.Input}
              value={surname}
              onChange={e => setSurname(e.target.value)}
              type="text"
              id="surname"
              required
            />
            <input
              className={styles.Input}
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              id="name"
              required
            />
            <input
              className={styles.Input}
              value={patronymic}
              onChange={e => setPatronymic(e.target.value)}
              type="text"
              id="patronymic"
              required
            />
            <input
              className={styles.Input}
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              id="email"
              required
            />
            <input
              className={styles.Input}
              value={formEducation}
              onChange={e => setFormEducation(e.target.value)}
              type="text"
              id="form_education"
              required
            />
            <select
              className={styles.Input}
              value={selectedSpeciality?.name}
              onChange={e => setSelectedSpeciality(e.target.value)}
            >
              {specialities.map(speciality => {
                return (
                  <option key={speciality?.uid}>{speciality?.name}</option>
                );
              })}
            </select>
          </div>
        </div>
        <div className={styles.Buttons}>
          <button
            className={`${styles.Button} ${styles.SaveButton}`}
            type="submit"
          >
            Сохранить
          </button>
          <Link
            to="/login"
            className={`${styles.Button} ${styles.CancelButton}`}
          >
            Отмена
          </Link>
        </div>
      </form>
    </div>
  );
}
