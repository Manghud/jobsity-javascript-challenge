import getDate from 'date-fns/getDate';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import toDate from 'date-fns/toDate';

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
  const {
    description,
    city,
    date,
    time
  } = reminderData;
  if (!description || description.length > 30) {
    return null;
  }
  if (isNaN(toDate(date))) {
    return null;
  }
  const timeRegexp = new RegExp('[1-9]{2}:[0-5][0-9]');
  if (!timeRegexp.test(time)) {
    return null;
  }
  const timeSegments = time.split(':').map(seg => parseInt(seg, 10));
  if (timeSegments[0] < 0 || timeSegments[0] > 23 || timeSegments[1] < 0 || timeSegments[1] > 59) {
    return null;
  }
  if (!city) {
    return null;
  }
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