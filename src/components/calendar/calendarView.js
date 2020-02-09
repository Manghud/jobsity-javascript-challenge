import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getRemindersForMonth } from './calendar.helpers';
import { setCalendarDate } from '../../actions/calendar';

class CalendarUI extends Component {
  componentDidMount() {
    const { activeDate = {} } = this.props;
    if (!activeDate.year) {
      this.props.setCalendarDate({ date: new Date() });
    }
  }
  render() {
    return (
      <div>
        Calendar UI
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const calendarState = state.calendar || {};
  const remindersState = state.reminders || {};
  return {
    activeDate: calendarState,
    reminders: getRemindersForMonth({
      reminders: remindersState,
      query: calendarState
    })
  };
};

export default connect(
  mapStateToProps,
  {
    setCalendarDate
  }
)(CalendarUI);