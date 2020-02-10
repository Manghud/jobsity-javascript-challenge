import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addReminder } from '../../actions/reminders';
import CalendarDateSelect from './calendarDateSelect';
import CreateReminder from './createReminder';
import CalendarMonthlyView from './monthlyView/calendarView';

import './calendar.module.scss';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCreateModal: false
    };
    this.onAddReminder = this.onAddReminder.bind(this);
    this.onShowCreateReminderModal = this.onShowCreateReminderModal.bind(this);
    this.onHideCreateReminderModal = this.onHideCreateReminderModal.bind(this);
  }

  onAddReminder(reminder) {
    this.props.addReminder(reminder);
    this.setState({
      showCreateModal: false
    });
  }

  onShowCreateReminderModal() {
    this.setState({
      showCreateModal: true
    });
  }

  onHideCreateReminderModal() {
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
        <CreateReminder
          open={this.state.showCreateModal}
          onConfirm={this.onAddReminder}
          onClose={this.onHideCreateReminderModal}
        />
      </React.Fragment>
    );
  }

  render() {
    return (
      <div styleName="calendarContainer">
        <div styleName="section">
          {this.renderAddReminder()}
          <a
            styleName="newReminderToggle"
            onClick={this.onShowCreateReminderModal}
            onClose={this.onHideCreateReminderModal}
          >
            New Reminder
          </a>
        </div>
        <div styleName="section">
          <CalendarDateSelect/>
        </div>
        <div styleName="section">
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
