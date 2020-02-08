import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRemindersForCalendar } from './calendar.helpers';

class Calendar extends Component {
  render() {
    return (
      <div>
        Reminders
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const calendarState = state.calendar || {};
  const remindersState = state.reminders || {};
  return {
    activeDate: calendarState,
    reminders: getRemindersForCalendar({
      reminders: remindersState,
      query: calendarState
    })
  };
};

export default connect(
  mapStateToProps,
  {}
)(Calendar);