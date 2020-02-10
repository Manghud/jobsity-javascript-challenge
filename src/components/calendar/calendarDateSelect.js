import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import setDate from 'date-fns/set';

import { setCalendarDate } from '../../actions/calendar';

import './calendarDateSelect.module.scss';

class CalendarDateTimeSelect extends Component {
  constructor(props) {
    super(props);
    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {
    const { activeDate = {} } = this.props;
    if (!activeDate.year) {
      this.props.setCalendarDate({ date: new Date() });
    }
  }

  onDateChange(date) {
    if (!date) {
      return null;
    }
    this.props.setCalendarDate({
      date,
      time: null
    });
  }

  render() {
    return (
      <div styleName="selectDateTimeInterval">
        <span styleName="label">
          Select an interval to display reminders
        </span>
        <DatePicker
          minDetail='year'
          maxDetail='year'
          onChange={this.onDateChange}
          value={this.props.activeDate}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const calendarState = state.calendar || {};
  return {
    activeDate: setDate(new Date(), calendarState)
  };
};

export default connect(
  mapStateToProps,
  {
    setCalendarDate
  }
)(CalendarDateTimeSelect);