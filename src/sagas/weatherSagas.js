import { takeEvery } from 'redux-saga/effects';
import {
  FETCH_WEATHER_FOR_CITY,
  FETCH_WEATHER_FOR_CITY_SUCCESS,
  FETCH_WEATHER_FOR_CITY_ERROR
} from '../actions/types/weather';
import { call, put } from 'redux-saga/effects';

import { filterForecastForCity } from './weatherSagas.helpers';
import { getWeatherForecastForCity } from '../services/weather';

function* getForecastForCity(action){
  const city = action.payload.city;
  const dates = action.payload.dates;
  const response = yield call(getWeatherForecastForCity, city);
  if(response.ok) {
    yield put({
      type: FETCH_WEATHER_FOR_CITY_SUCCESS,
      payload: filterForecastForCity({
        dates,
        forecastData: response.data
      })
    });
  } else {
    yield put({
      type: FETCH_WEATHER_FOR_CITY_ERROR
    });
  };
}

function* weatherSagas() {
  yield takeEvery(FETCH_WEATHER_FOR_CITY, getForecastForCity);
}

export default weatherSagas();