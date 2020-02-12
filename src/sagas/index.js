import { all } from 'redux-saga/effects';

import weatherSagas from './weatherSagas';

export default function* root() {
  yield all([
    weatherSagas
  ]);
}