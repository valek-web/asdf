import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './PassingTestPage.module.scss';
import Clock from '../../components/modules/Clock';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import {
  numberToTimeFormat,
  timestampToDate,
  timestampToTime,
} from '../../utils/formatDate';

export default function PassingTestPage({ isAuth }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState();

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/tests/get_tests_user`,
          {},
          {
            headers: {
              'X-Auth': authToken,
            },
          },
        );

        console.log(response.data);
        setTests(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTest();
  }, []);

  useEffect(() => {
    const foundTest = tests.find(test => test.uid === id);

    setSelectedTest(foundTest);
  }, [id, tests, selectedTest]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [isAuth, navigate]);

  if (!isAuth) return null;

  return (
    <>
      <div className={styles.Main}>
        <h2 className={styles.Title}>Диагностика</h2>
        <p className={styles.Text}>
          Добро пожаловать на платформу для тестирования и диагностики! Чтобы
          успешно пройти тестирование, убедитесь, что у вас стабильное
          интернет-соединение и тихое место для работы. Внимательно читайте
          вопросы и варианты ответов, а затем сдайте тест, нажав кнопку
          "Завершить". По завершении вы сможете просмотреть свои результаты.
          Желаем удачи и успешного прохождения тестирования!
        </p>
        <div className={styles.TimeInfo}>
          <div className={styles.DateBox}>
            <span className={styles.DateTitle}>Дата начала диагностик</span>
            <div className={styles.Date}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
              >
                <div className={styles.DatePicker}>
                  <input
                    readOnly
                    value={timestampToDate(selectedTest?.date_begin)}
                  />
                </div>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className={styles.TimePicker}>
                  <input
                    readOnly
                    value={timestampToTime(selectedTest?.date_begin)}
                  />
                </div>
              </LocalizationProvider>
            </div>
          </div>
          <div className={styles.DateBox}>
            <span className={styles.DateTitle}>Дата окончания диагностик</span>
            <div className={styles.Date}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
              >
                <div className={styles.DatePicker}>
                  <input
                    readOnly
                    value={timestampToDate(selectedTest?.date_end)}
                  />
                </div>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className={styles.TimePicker}>
                  <input
                    readOnly
                    value={timestampToTime(selectedTest?.date_end)}
                  />
                </div>
              </LocalizationProvider>
            </div>
          </div>
          <div className={`${styles.DateBox} ${styles.PassingTime}`}>
            <span className={styles.DateTitle}>Время прохождения</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className={styles.TimePicker}>
                <input
                  readOnly
                  value={numberToTimeFormat(selectedTest?.time_exec)}
                />
              </div>
            </LocalizationProvider>
          </div>
        </div>

        <Link to={`/test/questions/${id}`} className={styles.StartButton}>
          Начать
        </Link>
        <span className={styles.Author}>
          Автор: {selectedTest?.name_author}
        </span>
      </div>
      <Clock />
    </>
  );
}
