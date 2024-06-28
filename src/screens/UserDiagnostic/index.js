import { useEffect, useState } from 'react';
import styles from './UserDiagnostic.module.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function UserDiagnostic() {
  const [tests, setTests] = useState([]);
  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    const fetchTests = async () => {
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

        setTests(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className={styles.Main}>
      <div className={styles.Tests}>
        {tests.map(test => {
          return (
            <Link
              to={`/test/passing/${test.uid}`}
              className={styles.Test}
              key={test.uid}
            >
              <span className={styles.TestName}>{test.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
