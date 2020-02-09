import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addReminder
} from '../../actions/reminders';

class CreateReminder extends Component {
  render() {
    return (
      <div>
        CreateReminder
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
)(CreateReminder);