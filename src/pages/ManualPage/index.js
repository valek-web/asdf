import styles from './ManualPage.module.scss';
import ManualIcon from './icons/ManualIcon';
import Clock from '../../components/modules/Clock';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function ManualPage({ isAuth }) {
  const user = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (!isAuth) return null;

  return (
    <>
      <div className={styles.Manual}>
        <h2 className={styles.Title}>Руководство пользователя</h2>
        <div
          className={styles.Text}
          dangerouslySetInnerHTML={{
            __html: user.is_teacher
              ? `Добро пожаловать на страницу "Руководство пользователя"! Здесь вы найдете все необходимые материалы для эффективного использования данной платформы.<br/>
Мы подготовили два подробных руководства, чтобы помочь вам:<br/>
1. Руководство пользователя. Преподаватель: Этот документ содержит подробные инструкции для преподавателей, включая функциональные возможности системы, советы по эффективному использованию, а также решения распространенных проблем.<br/>
2. Руководство пользователя. Студент: В этом руководстве представлены пошаговые инструкции для студентов, включая процесс регистрации, навигацию по системе и использование основных функций.<br/>
Мы рекомендуем внимательно ознакомиться с соответствующим руководством, чтобы максимально эффективно использовать нашей платформой.`
              : `Добро пожаловать на страницу "Руководство пользователя"! Здесь вы найдете все необходимые материалы для эффективного использования данной платформы.<br/>
Мы подготовили два подробных руководства, чтобы помочь вам:<br/>
1. Руководство пользователя. Преподаватель: Этот документ содержит подробные инструкции для преподавателей, включая функциональные возможности системы, советы по эффективному использованию, а также решения распространенных проблем.<br/>
2. Руководство пользователя. Студент: В этом руководстве представлены пошаговые инструкции для студентов, включая процесс регистрации, навигацию по системе и использование основных функций.
Мы рекомендуем внимательно ознакомиться с соответствующим руководством, чтобы максимально эффективно использовать нашей платформой.`,
          }}
        />

        <span className={styles.Download}>Скачать:</span>
        <div className={styles.Material}>
          <div className={styles.MaterialItem}>
            <ManualIcon />
            Руководство пользователя. Преподаватель
          </div>
          <div className={styles.MaterialItem}>
            <ManualIcon />
            Руководство пользователя. Студент
          </div>
        </div>
      </div>
      <Clock />
    </>
  );
}
