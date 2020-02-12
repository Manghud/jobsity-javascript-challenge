import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addReminder } from '../../actions/reminders';
import CalendarDateSelect from './calendarDateSelect';
import ReminderForm from './reminderForm';
import CalendarMonthlyView from './monthlyView/calendarView';

import './calendar.module.scss';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false
    };
    this.onAddReminder = this.onAddReminder.bind(this);
    this.onShowReminderFormModal = this.onShowReminderFormModal.bind(this);
    this.onHideReminderFormModal = this.onHideReminderFormModal.bind(this);
  }

  onAddReminder(reminder) {
    this.props.addReminder(reminder);
    this.setState({
      showCreateModal: false
    });
  }

  onShowReminderFormModal() {
    this.setState({
      showCreateModal: true
    });
  }

  onHideReminderFormModal() {
    this.setState({
      showCreateModal: false
    });
  }

  renderAddReminder() {
    if (!this.state.showCreateModal) {
      return null;
    }
    return (
      <React.Fragment>
        <ReminderForm
          open={this.state.showCreateModal}
          onConfirm={this.onAddReminder}
          onClose={this.onHideReminderFormModal}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div styleName="calendarContainer">
        <div styleName="controlSection">
          <div styleName="calendarSelectSection">
            <CalendarDateSelect/>
          </div>
          <div styleName="newReminderSection">
            {this.renderAddReminder()}
            <a
              styleName="newReminderToggle"
              onClick={this.onShowReminderFormModal}
              onClose={this.onHideReminderFormModal}
            >
              New Reminder
            </a>
          </div>
        </div>
        <div styleName="mainSection">
          <CalendarMonthlyView/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  {
    addReminder
  }
)(Calendar);
