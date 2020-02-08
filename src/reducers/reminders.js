import generateReducer from './generateReducer';
import {
  ADD_REMINDER,
  REMOVE_REMINDER,
  EDIT_REMINDER
} from '../actions/types/reminders';

const initialState = {
  data: {},
  yearly: {},
  monthly: {},
  daily: {},
  hourly: {}
};

const removeFromIndex = (index = [], reminder) => index.filter(r => r.frontendId !== reminder.frontendId);

export default generateReducer(initialState, {
  [ADD_REMINDER](state, action) {
    const reminder = action.payload;
    const yearlyIndex = state.yearly[reminder.yearId] || [];
    const monthlyIndex = state.monthly[reminder.monthId] || [];
    const dailyIndex = state.daily[reminder.dayId] || [];
    const hourlyIndex = state.hourly[reminder.hourId] || [];
    const id = reminder.data.frontendId;
    const { yearId, monthId, dayId, hourId } = reminder.indices;
    return {
      ...state,
      data: {
        ...state.data,
        [id]: reminder.data
      },
      yearly: {
        ...state.yearly,
        [yearId]: [...yearlyIndex, id]
      },
      monthly: {
        ...state.yearly,
        [monthId]: [...monthlyIndex, id]
      },
      daily: {
        ...state.daily,
        [dayId]: [...dailyIndex, id]
      },
      hourly: {
        ...state.yearly,
        [hourId]: [...hourlyIndex, id]
      }
    };
  },
  [REMOVE_REMINDER](state, action) {
    const reminder = action.payload;
    const yearlyIndex = state.yearly[reminder.yearId] || [];
    const monthlyIndex = state.monthly[reminder.monthId] || [];
    const dailyIndex = state.daily[reminder.dayId] || [];
    const hourlyIndex = state.hourly[reminder.hourId] || [];
    const id = reminder.data.frontendId;
    const { [id]:idToRemove, ...newData } = state.data;
    const { yearId, monthId, dayId, hourId } = reminder.indices;
    return {
      ...state,
      data: newData,
      yearly: {
        ...state.yearly,
        [yearId]: removeFromIndex(yearlyIndex, id)
      },
      monthly: {
        ...state.yearly,
        [monthId]: removeFromIndex(monthlyIndex, id)
      },
      daily: {
        ...state.daily,
        [dayId]: removeFromIndex(dailyIndex, id)
      },
      hourly: {
        ...state.yearly,
        [hourId]: removeFromIndex(hourlyIndex, id)
      }
    };
  },

  [EDIT_REMINDER](state, action) {
    const reminderData = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        [reminderData.frontendId]: reminderData
      }
    };
  }

});