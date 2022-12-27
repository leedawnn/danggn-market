import dayjs from 'dayjs';

export const getDate = (value: string) => {
  const now = dayjs(value).format('YYYY.MM.DD');
  return now;
};

export const putOnComma = (price: number | null | undefined) => {
  return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
