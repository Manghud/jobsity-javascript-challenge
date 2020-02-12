import set from 'date-fns/set';
import getDate from 'date-fns/getDate';

import {
  getIndicesForReminder
} from '../../../actions/reminders';
const AVAILABLE_FORECAST_DAYS = 5;

export const getDateFromCalendar = calendar => {
  return set(new Date(), {
    year: calendar.year,
    month: calendar.month,
    date: calendar.day
  });
};

export const groupReminderTimesByCity = remindersByDate => {
  const reminderTimesByCity = {};
  Object.keys(remindersByDate)
    .filter(reminderDate => +reminderDate <= getDate(new Date()) + AVAILABLE_FORECAST_DAYS)
    .forEach(reminderDate => {
      const reminders = remindersByDate[reminderDate];
      reminders.forEach(reminder => {
        if (!reminder.city) {
          return;
        }
        const city = reminder.city.toLowerCase();
        if (!reminderTimesByCity[city]) {
          reminderTimesByCity[city] = [];
        }
        if (!reminderTimesByCity[city].includes(reminder.time)) {
          reminderTimesByCity[city].push(reminder.time);
        }
      });
    });
  return reminderTimesByCity;
};

export const getRemindersForMonth = ({ reminders, query }) => {
  const { year, month } = query;
  if (!year || !month) {
    return {};
  }
  const dateQuery = set(new Date(), { year, month });
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