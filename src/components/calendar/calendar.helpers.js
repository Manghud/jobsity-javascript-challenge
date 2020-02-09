import setDate from 'date-fns/set';

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
  return reminderIds.map(reminderId => reminders.data[reminderId]);
};