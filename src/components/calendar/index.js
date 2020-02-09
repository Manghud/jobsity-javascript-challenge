import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addReminder } from '../../actions/reminders';
import CalendarDateSelect from './calendarDateSelect';
import CreateReminder from './createReminder';
import CalendarView from './calendarView';

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
    return (
      <React.Fragment>
        <CreateReminder
          open={this.state.showCreateModal}
          onConfirm={this.onAddReminder}
          onClose={this.onHideCreateReminderModal}
        />
        <a sytleName="newReminderToggle" onClick={this.onShowCreateReminderModal}>New Reminder</a>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div styleName="calendarContainer">
        <div styleName="section">
          {this.renderAddReminder()}
        </div>
        <div styleName="section">
          <CalendarDateSelect/>
        </div>
        <div styleName="section">
          <CalendarView/>
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
