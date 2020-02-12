import {
  FETCH_WEATHER_FOR_CITY
} from './types/weather';

export const getWeatherForCityTimes = timesForCity => {
  return {
    type: FETCH_WEATHER_FOR_CITY,
    payload: timesForCity
  };
};