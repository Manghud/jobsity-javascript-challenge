import React, { Component } from 'react';
import { connect } from 'react-redux';
import getDaysInMonth from 'date-fns/getDaysInMonth';
import getDay from 'date-fns/getDay';
import { Grid } from 'semantic-ui-react';

import {
  getRemindersForMonth,
  getDateFromCalendar
} from '../calendar.helpers';
import { setCalendarDate } from '../../../actions/calendar';
import { editReminder, removeReminder } from '../../../actions/reminders';
import RemindersForDate from './remindersForDate';
import EditReminder from '../createReminder';

import './calendarView.module.scss';


class CalendarUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditReminderModal: false,
      editReminder: null
    };
    this.onEditReminder = this.onEditReminder.bind(this);
    this.onRemoveReminder = this.onRemoveReminder.bind(this);
    this.onShowEditReminderModal = this.onShowEditReminderModal.bind(this);
    this.onHideEditReminderModal = this.onHideEditReminderModal.bind(this);
  }

  onEditReminder(reminder) {
    this.props.editReminder({
      ...reminder,
      frontendId: this.state.editReminder.frontendId
    });
    this.onHideEditReminderModal();
  }

  onRemoveReminder(reminder) {
    this.props.removeReminder(reminder);
    if (this.state.showEditReminderModal) {
      this.onHideEditReminderModal();
    }
  }

  onShowEditReminderModal(reminder) {
    this.setState({
      showEditReminderModal: true,
      editReminder: reminder
    });
  }

  onHideEditReminderModal() {
    this.setState({
      showEditReminderModal: false,
      editReminder: null
    });
  }

  renderEditReminder() {
    const { showEditReminderModal, editReminder } = this.state;
    if (!showEditReminderModal || !editReminder) {
      return null;
    }
    return (
      <EditReminder
        editMode={{ ...editReminder }}
        open={showEditReminderModal}
        onConfirm={this.onEditReminder}
        onRemove={this.onRemoveReminder}
        onClose={this.onHideEditReminderModal}
      />
    );
  }

  renderRemindersForDate(date, previousMonth) {
    const { reminders } = this.props;
    return (
      <RemindersForDate
        key={previousMonth ? date + '_previous' : date}
        date={date}
        reminders={previousMonth ? [] : reminders[date]}
        onShowEditReminderModal={this.onShowEditReminderModal}
        onRemoveReminder={this.onRemoveReminder}
        previousMonth={previousMonth}
      />
    );
  }

  renderCalendarHeaders() {
    return [];
  }

  renderReminders() {
    const { daysInMonth, daysInPreviousMonth, firstDayInMonth } = this.props;
    if (!daysInMonth) {
      return [];
    }
    const rowsToRender = [];
    const daysFromPreviousMonth = firstDayInMonth > 0 ? firstDayInMonth : 0;
    for (let w = 0; w < 5; w++) {
      const rowItems = [];
      for(let d = 0; d < 7; d++) {
        if (w === 0 && d < firstDayInMonth) {
          const date = daysInPreviousMonth - firstDayInMonth + d + 1;
          rowItems.push(this.renderRemindersForDate(date, true));
          continue;
        }
        const date = w * 7 + d + 1 - daysFromPreviousMonth;
        if (date > daysInMonth) {
          rowItems.push(this.renderRemindersForDate(date - daysInMonth, true));
          continue;
        }
        rowItems.push(this.renderRemindersForDate(date));
      }
      rowsToRender.push(<Grid.Row key={w} columns={7}>{rowItems}</Grid.Row>);
    }
    return <Grid columns={7}>{rowsToRender}</Grid>;
  }

  render() {
    return <React.Fragment>
      <div styleName="calendarView">
        {this.renderReminders()}
      </div>
      {this.renderEditReminder()}
    </React.Fragment>;
  }
}

const mapStateToProps = (state, props) => {
  const calendarState = state.calendar || {};
  const remindersState = state.reminders || {};
  const calendarDate = getDateFromCalendar(calendarState);
  const calendarDateForFirstDayInMonth = getDateFromCalendar({
    ...calendarState,
    day: 1
  });
  const previousMonthDate = getDateFromCalendar({
    ...calendarState,
    day: 1,
    month: calendarState.month > 0 ? calendarState.month -1 : 11
  });
  return {
    activeDate: calendarState,
    reminders: getRemindersForMonth({
      reminders: remindersState,
      query: calendarState
    }),
    daysInMonth: getDaysInMonth(calendarDate),
    daysInPreviousMonth: getDaysInMonth(previousMonthDate),
    firstDayInMonth: getDay(calendarDateForFirstDayInMonth)
  };
};

export default connect(
  mapStateToProps,
  {
    setCalendarDate,
    editReminder,
    removeReminder
  }
)(CalendarUI);