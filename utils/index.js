import { format } from 'date-fns';

export const getDetailDate = date => {
  const noon = format(new Date(date), 'a..aaa');

  if (noon === 'AM') {
    return format(new Date(date), 'yyyy년 MM월 d일 오전 h시 m분');
  }

  return format(new Date(date), 'yyyy년 MM월 d일 오후 h시 m분');
}

export const getToday = format(new Date(new Date().toISOString()), 'yyyy년 MM월 d일');
