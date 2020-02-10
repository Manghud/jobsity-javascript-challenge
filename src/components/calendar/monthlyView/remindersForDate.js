import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

import Reminder from './reminder';

import './remindersForDate.module.scss';

class RemindersForDate extends Component {

  constructor(props) {
    super(props);
    this.onClearReminders = this.onClearReminders.bind(this);
  }

  onClearReminders() {
    const reminders = this.props.reminders ? [...this.props.reminders] : [];
    reminders.forEach(reminder => {
      this.props.onRemoveReminder(reminder);
    });
  }

  renderReminders() {
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

  render() {
    const { date } = this.props;
    return (
      <div styleName="remindersForDate">
        <span styleName="dateLabel">{date}</span>
        <span styleName="removeReminders" onClick={this.onClearReminders}>
          <Icon name="trash"/>
        </span>
        <div styleName="remindersContainer">
          {this.renderReminders()}
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


export default RemindersForDate;