import dayjs from 'dayjs';

export const getDate = (value: string) => {
  const now = dayjs(value).format('YYYY.MM.DD');
  return now;
};
