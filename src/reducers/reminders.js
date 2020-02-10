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

const removeFromIndex = (index = [], id) => index.filter(reminderId => reminderId !== id);

export default generateReducer(initialState, {
  [ADD_REMINDER](state, action) {
    const reminder = action.payload;
    const { yearId, monthId, dayId, hourId } = reminder.indices;
    const yearlyIndex = state.yearly[yearId] || [];
    const monthlyIndex = state.monthly[monthId] || [];
    const dailyIndex = state.daily[dayId] || [];
    const hourlyIndex = state.hourly[hourId] || [];
    const id = reminder.data.frontendId;
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
        ...state.monthly,
        [monthId]: [...monthlyIndex, id]
      },
      daily: {
        ...state.daily,
        [dayId]: [...dailyIndex, id]
      },
      hourly: {
        ...state.hourly,
        [hourId]: [...hourlyIndex, id]
      }
    };
  },
  [REMOVE_REMINDER](state, action) {
    const reminder = action.payload;
    const { yearId, monthId, dayId, hourId } = reminder.indices;
    const yearlyIndex = state.yearly[yearId] || [];
    const monthlyIndex = state.monthly[monthId] || [];
    const dailyIndex = state.daily[dayId] || [];
    const hourlyIndex = state.hourly[hourId] || [];
    const id = reminder.data.frontendId;
    const { [id]:idToRemove, ...newData } = state.data;
    return {
      ...state,
      data: newData,
      yearly: {
        ...state.yearly,
        [yearId]: removeFromIndex(yearlyIndex, id)
      },
      monthly: {
        ...state.monthly,
        [monthId]: removeFromIndex(monthlyIndex, id)
      },
      daily: {
        ...state.daily,
        [dayId]: removeFromIndex(dailyIndex, id)
      },
      hourly: {
        ...state.hourly,
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