import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './weatherReport.module.scss';

class WeatherReport extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    const { city, hour, weather } = this.props;
    return (
      <div styleName="weatherReport">
        <b>{this.capitalizeFirstLetter(city)}</b>
        <span><b>&nbsp;-&nbsp;{hour < 10 ? `0${hour}` : hour}:00&nbsp;-&nbsp;</b></span>
        <span styleName="weatherDescription">{this.capitalizeFirstLetter(weather)}</span>
      </div>
    );
  }
}

WeatherReport.propTypes = {
  city: PropTypes.string,
  hour: PropTypes.number,
  weather: PropTypes.string
};

export default WeatherReport;