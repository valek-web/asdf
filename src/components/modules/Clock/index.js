import { useEffect, useState } from 'react';
import { formatDate, formatTime } from '../../../utils/formatDate';
import styles from './Clock.module.scss';
import { Timer } from '../../elements/Timer';

export default function Clock({ exec }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.Clock}>
      {exec ? (
        <div className={styles.Item}>
          <Timer initialSeconds={exec} />
        </div>
      ) : (
        <>
          <div className={styles.Item}>{formatDate(currentDate)}</div>
          <div className={styles.Item}>{formatTime(currentDate)}</div>
        </>
      )}
    </div>
  );
}
