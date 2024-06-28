import { useEffect, useState } from 'react';

export const Timer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  // Функция для форматирования времени в формат "MM:SS"
  const formatTime = secs => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Эффект для запуска интервала и уменьшения счетчика
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prevSeconds => prevSeconds - 1);
      }
    }, 1000);

    // Остановка интервала, когда счетчик достигнет 0
    return () => clearInterval(interval);
  }, [seconds]);

  return <>{formatTime(seconds)}</>;
};
