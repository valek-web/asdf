import styles from './ProfilePage.module.scss';
import Clock from '../../components/modules/Clock';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProfilePage({ isAuth }) {
  const user = useAuth();
  const navigate = useNavigate();
  const [specialities, setSpecialities] = useState([]);

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

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (!isAuth) return null;

  return (
    <>
      <div className={styles.Info}>
        <h2 className={styles.Title}>Общая информация</h2>
        <div className={styles.Main}>
          <div
            className={`${styles.LabelWrapper} ${styles.LabelWrapperMoreInfo}`}
          >
            <label className={styles.Label} htmlFor="login">
              Логин
            </label>
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
              type="text"
              id="login"
              readonly
              value={user.login}
            />
            <input
              className={styles.Input}
              type="text"
              id="surname"
              readonly
              value={user.surname}
            />
            <input
              className={styles.Input}
              type="text"
              id="name"
              readonly
              value={user.name}
            />
            <input
              className={styles.Input}
              type="text"
              id="patronymic"
              readonly
              value={user.patronymic}
            />
            <input
              className={styles.Input}
              type="email"
              id="email"
              readonly
              value={user.email}
            />
            <input
              className={styles.Input}
              type="text"
              id="form_education"
              readonly
              value={user.form_education}
            />
            <input
              className={styles.Input}
              type="text"
              id="speciality"
              readonly
              value={specialities.find(s => s.uid === user.speciality)?.name}
            />
          </div>
        </div>
      </div>
      <Clock />
    </>
  );
}
