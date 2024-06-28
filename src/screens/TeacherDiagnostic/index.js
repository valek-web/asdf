import styles from './TeacherDiagnostic.module.scss';
import Clock from '../../components/modules/Clock';
import CreateIcon from './icons/CreateIcon';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HideIcon from './icons/HideIcon';
import EditIcon from './icons/EditIcon';
import axios from 'axios';

export default function TeacherDiagnostic() {
  const [showEnterName, setShowEnterName] = useState(false);
  const [testName, setTestName] = useState('');
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');

  const saveTestName = () => {
    if (!testName) {
      alert('Пожалуйста, введите имя теста');
    } else if (testName.length < 3) {
      alert('Имя теста не должно быть меньше 3-х символов');
    } else {
      navigate(`/test/create?name=${testName}`);
    }
  };

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/api/v1/tests/get_tests_teacher`,
          {},
          {
            headers: {
              'X-Auth': authToken,
            },
          },
        );

        setTests(response.data.arr_tests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTests();
  }, []);

  const handleEdit = async id => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/tests/save_test`,
        {
          test_uid: id,
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
  };

  const handleHide = async id => {
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/tests/hide_test`,
        {
          test_uid: id,
          is_visible: 'false',
        },
        {
          headers: {
            'X-Auth': authToken,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.Main}>
        <button
          className={styles.CreateButton}
          onClick={() => setShowEnterName(!showEnterName)}
        >
          <CreateIcon />
        </button>
        {showEnterName ? (
          <div className={styles.EnterName}>
            <input
              className={styles.EnterNameInput}
              type="text"
              value={testName}
              onChange={e => setTestName(e.target.value)}
              placeholder="Введите название теста"
            />
            <button
              className={styles.EnterNameSaveButton}
              onClick={saveTestName}
            >
              Сохранить
            </button>
          </div>
        ) : (
          <div className={styles.Tests}>
            {tests.map(test => {
              return (
                <div className={styles.Test} key={test.uid}>
                  <span className={styles.TestName}>{test.name}</span>
                  <button
                    className={styles.EditButton}
                    onClick={() => handleEdit(test.uid)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    className={styles.HideButton}
                    onClick={() => handleHide(test.uid)}
                  >
                    <HideIcon />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Clock />
    </>
  );
}
