import {
  FETCH_WEATHER_FOR_CITY
} from './types/weather';

export const getWeatherForCityDates = datesByCity => {
  return {
    type: FETCH_WEATHER_FOR_CITY,
    payload: datesByCity
  };
};