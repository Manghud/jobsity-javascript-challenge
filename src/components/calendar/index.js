import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setCalendarDate } from '../../actions/calendar';
import DateTimeSelect from './dateTimeSelect';
import CreateReminder from './createReminder';
import CalendarView from './calendarView';

class Calendar extends Component {
  componentDidMount() {
    const { activeDate = {} } = this.props;
    if (!activeDate.year) {
      this.props.setCalendarDate({ date: new Date() });
    }
  }
  render() {
    const {
      activeDate
    } = this.props;
    return (
      <div>
        <DateTimeSelect activeDate={activeDate}/>
        <CreateReminder/>
        <CalendarView/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const calendarState = state.calendar || {};
  return {
    activeDate: calendarState
  };
};

export default connect(
  mapStateToProps,
  {
    setCalendarDate
  }
)(Calendar);