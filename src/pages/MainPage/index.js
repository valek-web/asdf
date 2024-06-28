import styles from './MainPage.module.scss';
import Clock from '../../components/modules/Clock';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function MainPage({isAuth}) {
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
      <div className={styles.Welcome}>
        <h2 className={styles.Title}>
          Здравствуйте, {user.name} {user.surname}!
        </h2>
        <p className={styles.Text}>
          {user.is_teacher
            ? 'Добро пожаловать на нашу платформу диагностики! Мы рады приветствовать вас и готовы предоставить все необходимые инструменты для создания эффективных и точных диагностических тестов. Наша система разработана для того, чтобы вы могли легко составлять, управлять и анализировать результаты тестов, помогая вашим ученикам достигать новых высот в обучении. Желаем вам успехов в создании диагностики и благодарим за ваш вклад в образование!'
            : 'Добро пожаловать на нашу платформу диагностики! Мы рады видеть вас здесь и готовы помочь вам в оценке ваших знаний и навыков. Наша система предлагает точные и надежные инструменты для тестирования, которые помогут вам достичь новых высот в обучении. Желаем вам успешного прохождения диагностики и достижения всех поставленных целей!'}
        </p>
      </div>
      <Clock />
    </>
  );
}
