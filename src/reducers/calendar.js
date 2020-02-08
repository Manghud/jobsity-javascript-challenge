import generateReducer from './generateReducer';
import {
  SET_CALENDAR_DATE
} from '../actions/types/calendar';

const initialState = {
  year: null,
  month: null,
  day: null,
  time: null
};

export default generateReducer(initialState, {
  [SET_CALENDAR_DATE](state, action) {
    return { ...action.payload };
  }
});