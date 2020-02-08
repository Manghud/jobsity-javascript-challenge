import { hot } from 'react-hot-loader/root';
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import config from '../config';
import {
  Calendar
} from './routes';

export class Router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Calendar}/>
      </Switch>
    );
  }
}

let RouterForEnv;
if (config.isDevEnvironment) {
  RouterForEnv = hot(Router);
} else {
  RouterForEnv = Router;
}

export default RouterForEnv;