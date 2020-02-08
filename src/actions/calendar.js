import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';

import { SET_CALENDAR_DATE } from './types/calendar';

export const setCalendarDate = ({ date, time }) => {
  return {
    type: SET_CALENDAR_DATE,
    payload: {
      year: getYear(date),
      month: getMonth(date),
      day: getDate(date),
      time
    }
  };
};