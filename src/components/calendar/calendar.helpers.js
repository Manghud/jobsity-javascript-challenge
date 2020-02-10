import setDate from 'date-fns/set';
import getDate from 'date-fns/getDate';

import {
  getIndicesForReminder
} from '../../actions/reminders';

export const getRemindersForMonth = ({ reminders, query }) => {
  const { year, month } = query;
  if (!year || !month) {
    return {};
  }
  const dateQuery = setDate(new Date(), { year, month });
  const { monthId } = getIndicesForReminder({
    date: dateQuery,
    time: null
  });
  const reminderIds = reminders.monthly[monthId];
  if (!reminderIds) {
    return {};
  }
  const remindersByDayOfMonth = {};
  reminderIds.forEach(reminderId => {
    const reminder = reminders.data[reminderId];
    const date = getDate(reminder.date);
    if (!remindersByDayOfMonth[date]) {
      remindersByDayOfMonth[date] = [];
    }
    remindersByDayOfMonth[date].push(reminder);
  });
  return remindersByDayOfMonth;
};