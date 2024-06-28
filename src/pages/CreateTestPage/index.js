import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './CreateTestPage.module.scss';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import AddIcon from './icons/AddIcon';
import QuestionSetting from '../../components/modules/Question';
import { convertToUnix, convertTimeToSeconds } from '../../utils/formatDate';

export default function CreateTestPage() {
  const user = useAuth();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get('name');

  const [specialities, setSpecialities] = useState([]);
  const [showSpecialities, setShowSpecialities] = useState(false);
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [selectedSpecialitiesId, setSelectedSpecialitiesId] = useState([]);
  const [dateBegin, setDateBegin] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [timeBegin, setTimeBegin] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [timeExec, setTimeExec] = useState('');
  const [questions, setQuestions] = useState([]);
  const authToken = localStorage.getItem('authToken');

  const modalRef = useRef(null);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/regist/get_speciality`,
        );

        setSpecialities(response.data);
        setSelectedSpecialities([]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSpecialities();
  }, []);

  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSpecialities(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = speciality => {
    let updatedSpecialities = [...selectedSpecialities];

    const index = updatedSpecialities.findIndex(s => s.uid === speciality.uid);

    if (index >= 0) {
      updatedSpecialities = updatedSpecialities.filter(
        s => s.uid !== speciality.uid,
      );
    } else {
      updatedSpecialities.push(speciality);
    }

    setSelectedSpecialities(updatedSpecialities);

    setSelectedSpecialitiesId(updatedSpecialities.map(s => s.uid));

    console.log(updatedSpecialities);
  };

  const addQuestion = () => {
    const newId =
      questions.length > 0 ? questions[questions.length - 1].id + 1 : 1;

    setQuestions([
      ...questions,
      {
        id: newId,
        title: '',
        type: '',
        options: [
          { title: '', isRight: false },
          { title: '', isRight: false },
        ],
        score: '',
      },
    ]);
  };

  const updateQuestion = (id, updatedQuestion) => {
    setQuestions(
      questions.map(question =>
        question.id === id ? updatedQuestion : question,
      ),
    );
  };

  const deleteQuestion = id => {
    setQuestions(questions.filter(question => question.id !== id));
  };

  const saveTest = async () => {
    if (dateBegin && timeBegin && dateEnd && timeEnd && questions.length > 0) {
      try {
        const transformedQuestions = questions.map(question => ({
          formulation: question.title,
          type: 1,
          tasks: question.options.map(option => ({
            formulation: option.title,
            reply: option.isRight,
          })),
        }));

        await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/tests/save_test`,
          {
            name: name,
            theme: 'math',
            access: selectedSpecialitiesId,
            date_begin: `${convertToUnix(`${dateBegin} ${timeBegin}`)}`,
            date_end: `${convertToUnix(`${dateEnd} ${timeEnd}`)}`,
            time_exec: `${convertTimeToSeconds(timeExec)}`,
            questions: transformedQuestions,
          },
          {
            headers: {
              'X-Auth': authToken,
            },
          },
        );

        navigate('/diagnostic');
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Заполните все поля');
    }
  };

  return (
    <>
      {user.is_teacher ? (
        <div>
          <div className={styles.MainInfo}>
            <h2 className={styles.Name}>{name}</h2>
            <button
              className={styles.SelectSpecialitiesButton}
              onClick={() => setShowSpecialities(!showSpecialities)}
            >
              Выбрать группы
            </button>
            {showSpecialities && (
              <div className={styles.SpecialitiesModal} ref={modalRef}>
                {specialities.map(speciality => {
                  return (
                    <label className={styles.Speciality} key={speciality.uid}>
                      <input
                        className={styles.SpecialityInput}
                        type="checkbox"
                        onChange={() => handleCheckboxChange(speciality)}
                        checked={selectedSpecialities.includes(speciality)}
                      />
                      {speciality?.name}
                    </label>
                  );
                })}
              </div>
            )}
            <div className={styles.Options}>
              <div className={styles.Option}>
                <span className={styles.OptionName}>
                  Дата начала диагностик
                </span>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ru"
                >
                  <DatePicker
                    className={styles.DatePicker}
                    onChange={newValue => {
                      setDateBegin(
                        `${newValue.$D}-${newValue.$M + 1}-${newValue.$y}`,
                      );
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    className={styles.TimePicker}
                    onChange={newValue => {
                      setTimeBegin(`${newValue.$H}:${newValue.$m}`);
                    }}
                    ampm={false}
                  />
                </LocalizationProvider>
              </div>
              <div className={styles.Option}>
                <span className={styles.OptionName}>
                  Дата окончания диагностик
                </span>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ru"
                >
                  <DatePicker
                    className={styles.DatePicker}
                    onChange={newValue => {
                      setDateEnd(
                        `${newValue.$D}-${newValue.$M + 1}-${newValue.$y}`,
                      );
                    }}
                  />
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    className={styles.TimePicker}
                    onChange={newValue => {
                      setTimeEnd(`${newValue.$H}:${newValue.$m}`);
                    }}
                    ampm={false}
                  />
                </LocalizationProvider>
              </div>
              <div className={styles.Option}>
                <span className={styles.OptionName}>
                  Дата окончания диагностик
                </span>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    className={styles.TimePicker}
                    onChange={newValue => {
                      setTimeExec(`${newValue.$H}:${newValue.$m}`);
                    }}
                    ampm={false}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
          {questions.map(question => {
            return (
              <QuestionSetting
                key={question.id}
                question={question}
                onUpdate={updateQuestion}
                onDelete={deleteQuestion}
              />
            );
          })}
          <div className={styles.Buttons}>
            <button
              className={`${styles.Button} ${styles.AddButton}`}
              onClick={addQuestion}
            >
              <AddIcon />
              Добавить
            </button>
            {questions.length > 0 && (
              <button
                className={`${styles.Button} ${styles.SaveButton}`}
                onClick={saveTest}
              >
                Сохранить
              </button>
            )}
          </div>
        </div>
      ) : (
        navigate('/')
      )}
    </>
  );
}
