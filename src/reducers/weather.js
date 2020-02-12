import generateReducer from './generateReducer';
import {
  FETCH_WEATHER_FOR_CITY,
  FETCH_WEATHER_FOR_CITY_SUCCESS,
  FETCH_WEATHER_FOR_CITY_ERROR
} from '../actions/types/weather';

const initialState = {
  loading: false,
  byCity: {}
};

export default generateReducer(initialState, {
  [FETCH_WEATHER_FOR_CITY](state, action) {
    return { ...state, loading: true };
  },
  [FETCH_WEATHER_FOR_CITY_SUCCESS](state, action) {
    const cityName = action.payload.city;
    const forecast = action.payload.forecast;
    return {
      ...state,
      byCity: {
        ...state.byCity,
        [cityName]: forecast
      },
      loading: false
    };
  },
  [FETCH_WEATHER_FOR_CITY_ERROR](state, action) {
    return {
      ...state,
      loading: false
    };
  }
});