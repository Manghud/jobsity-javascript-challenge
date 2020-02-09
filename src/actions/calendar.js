import getYear from 'date-fns/getYear';
import getMonth from 'date-fns/getMonth';
import getDate from 'date-fns/getDate';

import { SET_CALENDAR_DATE } from './types/calendar';

export const setCalendarDate = ({ date, time = null }) => {
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