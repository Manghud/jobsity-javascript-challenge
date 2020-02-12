import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';

import Reminder from './reminder';
import WeatherReport from './weatherReport';
import { getWeatherDataForDate } from './remindersForDate.helpers';

import './remindersForDate.module.scss';

class RemindersForDate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showWeather: false
    };
    this.onClearReminders = this.onClearReminders.bind(this);
    this.onToggleWeather = this.onToggleWeather.bind(this);
  }

  onClearReminders() {
    const reminders = this.props.reminders ? [...this.props.reminders] : [];
    reminders.forEach(reminder => {
      this.props.onRemoveReminder(reminder);
    });
  }

  onToggleWeather() {
    this.setState({
      showWeather: !this.state.showWeather
    });
  }

  renderWeatherToggle() {
    const { weatherData = {} } = this.props;
    const { showWeather } = this.state;
    if (!Object.keys(weatherData).length) {
      return null;
    }
    return (
      <span styleName="control toggleWeather" onClick={this.onToggleWeather}>
        <Icon name={showWeather ? 'tasks' : 'umbrella'}/>
      </span>
    );
  }

  renderRemoveReminders() {
    const { reminders = [] } = this.props;
    if (!reminders.length) {
      return null;
    }
    return (
      <span styleName="control removeReminders" onClick={this.onClearReminders}>
        <Icon name="trash"/>
      </span>
    );
  }

  renderReminders() {
    if (this.state.showWeather) {
      return null;
    }
    const reminders = this.props.reminders ? [...this.props.reminders] : [];
    reminders.sort((a, b) => {
      const timeA = parseInt(a.time.substring(0, 2)) + parseInt(a.time.substring(3, 5)) / 60;
      const timeB = parseInt(b.time.substring(0, 2)) + parseInt(b.time.substring(3, 5)) / 60;
      return timeA > timeB ? 1 : timeA < timeB ? -1 : 0;
    });
    return reminders.map(reminder =>
      <Reminder
        key={reminder.frontendId}
        reminder={reminder}
        onShowEditReminderModal={this.props.onShowEditReminderModal}
        onRemoveReminder={this.props.onRemoveReminder}
      />
    );
  }

  renderWeather() {
    if(!this.state.showWeather) {
      return null;
    }
    const { weatherData = {} } = this.props;
    return Object.keys(weatherData).map(city => {
      return weatherData[city].map(weatherDataForCity => (
        <WeatherReport
          city={city}
          weather={weatherDataForCity.weather}
          hour={weatherDataForCity.time}
        />
      ));
    });
  }

  render() {
    const { date, previousMonth } = this.props;
    const styleName = previousMonth ? 'previousMonth remindersForDate' : 'remindersForDate';
    return (
      <div styleName={styleName}>
        <div styleName="header">
          <span styleName="dateLabel">{date}</span>
          {this.renderWeatherToggle()}
          {this.renderRemoveReminders()}
        </div>
        <div styleName="remindersContainer">
          {this.renderReminders()}
          {this.renderWeather()}
        </div>
      </div>
    );
  }
}

RemindersForDate.propTypes = {
  reminders: PropTypes.array,
  date: PropTypes.number,
  onShowEditReminderModal: PropTypes.func
};

const mapStateToProps = (state, props) => {
  const weatherState = (state.weather && state.weather.byCityDate) || {};
  const calendarState = state.calendar || {};
  return {
    weatherData: getWeatherDataForDate({
      weatherState,
      calendarState,
      date: props.date
    })
  };
};

export default connect(
  mapStateToProps,
  {}
)(RemindersForDate);