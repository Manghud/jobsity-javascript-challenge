import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReminderList extends Component {
  render() {
    return (
      <div>
        Reminders
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(ReminderList);