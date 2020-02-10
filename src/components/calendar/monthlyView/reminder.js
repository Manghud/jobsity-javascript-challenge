import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './reminder.module.scss';

class MonthlyViewReminder extends Component {

  constructor(props) {
    super(props);
    this.onShowEditReminderModal = this.onShowEditReminderModal.bind(this);
  }

  onShowEditReminderModal() {
    this.props.onShowEditReminderModal(this.props.reminder);
  }

  render() {
    const { reminder = {} }= this.props;
    return (
      <div styleName="reminder">
        <div onClick={this.onShowEditReminderModal}>
          <b>{reminder.time}:&nbsp;</b>
          <span styleName="reminderDescription" style={{ color: reminder.color }}>
            {reminder.description}
          </span>
        </div>
      </div>
    );
  }
}

MonthlyViewReminder.propTypes = {
  reminder: PropTypes.object,
  onShowEditReminderModal: PropTypes.func,
  onEditReminder: PropTypes.func
};

export default MonthlyViewReminder;