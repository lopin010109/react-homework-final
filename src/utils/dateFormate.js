import dayjs from 'dayjs';

export const timeToDate = (time) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
};
