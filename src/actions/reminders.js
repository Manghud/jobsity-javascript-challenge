import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';

import {
  ADD_REMINDER, REMOVE_REMINDER, EDIT_REMINDER
} from './types/reminders';


export const getIndicesForReminder = reminder => {
  const yearId = getYear(reminder.date);
  const monthId = `${yearId}-${getMonth(reminder.date)}`;
  const dayId = `${monthId}-${getDate(reminder.date)}`;
  const hourId = `${dayId}-${reminder.time}`;
  return {
    yearId,
    monthId,
    dayId,
    hourId
  };
};

export const addReminder = reminderData => {
  return {
    type: ADD_REMINDER,
    payload: {
      data: reminderData,
      indices: getIndicesForReminder(reminderData)
    }
  };
};

export const removeReminder = reminderData => {
  return {
    type: REMOVE_REMINDER,
    payload: {
      data: reminderData,
      indices: getIndicesForReminder(reminderData)
    }
  };
};

export const editReminder = reminderData => {
  return {
    type: EDIT_REMINDER,
    payload: reminderData
  };
};