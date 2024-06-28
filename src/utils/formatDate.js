export const formatDate = date => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const formatTime = date => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return `${hours}:${minutes}`;
};

export function timestampToDate(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

export function timestampToTime(timestamp) {
  const date = new Date(timestamp);

  date.setUTCHours(0, 0, 0);

  const localTime = date.toLocaleTimeString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
  });

  return localTime;
}

export function numberToTimeFormat(number) {
  const minutes = Math.floor(number / 60);
  const seconds = number % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  return formattedTime;
}

export const convertToUnix = dateString => {
  const [datePart, timePart] = dateString.split(' ');

  const [day, month, year] = datePart.split('-').map(Number);

  const [hours, minutes] = timePart.split(':').map(Number);

  const dateObject = new Date(year, month - 1, day, hours, minutes);

  const unixTimestamp = Math.floor(dateObject.getTime() / 1000);

  return unixTimestamp;
};

export function convertTimeToSeconds(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);

  const totalSeconds = hours * 3600 + minutes * 60;

  return totalSeconds;
}
