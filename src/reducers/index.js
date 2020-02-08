import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import remindersReducer from './reminders';
import calendarReducer from './calendar';

export default (history) => combineReducers({
  router: connectRouter(history),
  reminders: remindersReducer,
  calendar: calendarReducer
});