import React, { Component } from 'react';
import { connect } from 'react-redux';
import getDaysInMonth from 'date-fns/getDaysInMonth';

import { getRemindersForMonth } from '../calendar.helpers';
import { setCalendarDate } from '../../../actions/calendar';
import { editReminder, removeReminder } from '../../../actions/reminders';
import RemindersForDate from './remindersForDate';
import EditReminder from '../createReminder';

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

  renderReminders() {
    const { reminders = {}, daysInMonth } = this.props;
    if (!daysInMonth) {
      return [];
    }
    return Array.apply(this, Array(daysInMonth)).map((_, i) => {
      const date = i + 1;
      return <RemindersForDate
        key={date}
        date={date}
        reminders={reminders[date]}
        onShowEditReminderModal={this.onShowEditReminderModal}
        onRemoveReminder={this.onRemoveReminder}
      />;
    });
  }

  render() {
    return <React.Fragment>
      {this.renderReminders()}
      {this.renderEditReminder()}
    </React.Fragment>;
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
    }),
    daysInMonth: getDaysInMonth(calendarState.month)
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