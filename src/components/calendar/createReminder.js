import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Input } from 'semantic-ui-react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import { SketchPicker } from 'react-color';
import uuid from 'uuid/v4';

import './createReminder.module.scss';

const INITIAL_STATE = {
  description: '',
  date: new Date(),
  time: '12:00',
  color: '#fff',
  city: '',
  showErrors: false
};

class CreateReminder extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.onConfirm = this.onConfirm.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
  }

  onConfirm() {
    const {
      description,
      date,
      time,
      color,
      city
    } = this.state;
    if (!description || !date || !time || !city) {
      this.setState({
        showErrors: true
      });
      return;
    }
    this.props.onConfirm({
      frontendId: uuid(),
      description,
      date,
      time,
      color,
      city
    });
    this.setState(INITIAL_STATE);
  }

  onDescriptionChange(_, data) {
    if (data.value.length > 30) {
      return;
    }
    this.setState({ description: data.value });
  }

  onDateChange(date) {
    this.setState({ date });
  }

  onTimeChange(time) {
    this.setState({ time });
  }

  onCityChange(_, data) {
    this.setState({ city: data.value });
  }

  onColorChange(color) {
    this.setState({ color: color.hex });
  }

  renderInputLabel(label, value) {
    const requiredFields = ['description', 'date', 'time', 'city'];
    const isMissingRequired = requiredFields.includes(value) && !this.state[value];
    const showErrors = this.state.showErrors;
    return <label>
      {label}
      {isMissingRequired && showErrors ? <span styleName="formError">&nbsp;&nbsp;*Required</span> : null}
    </label>;
  }

  render() {
    const {
      open,
      onClose
    } = this.props;
    const {
      date,
      description,
      time,
      city,
      color
    } = this.state;
    return (
      <Modal
        open={open}
        onClose={onClose}
        closeOnEscape
        closeOnDimmerClick
        closeIcon
      >
        <Modal.Header>Add new Reminder</Modal.Header>
        <Modal.Content>
          <div styleName="addReminderForm">
            {this.renderInputLabel('Decription', 'description')}
            <Input
              placeholder={'Description'}
              value={description}
              onChange={this.onDescriptionChange}
            />
            {this.renderInputLabel('Date', 'date')}
            <DatePicker
              onChange={this.onDateChange}
              value={date}
            />
            {this.renderInputLabel('Time', 'time')}
            <TimePicker
              maxDetail='minute'
              hourPlaceholder='00'
              minutePlaceholder='00'
              value={time}
              onChange={this.onTimeChange}
            />
            {this.renderInputLabel('City', 'city')}
            <Input
              placeholder={'City'}
              value={city}
              onChange={this.onCityChange}
            />
            {this.renderInputLabel('Color', 'color')}
            <SketchPicker
              color={color}
              onChangeComplete={this.onColorChange}
            />
            <Button primary onClick={this.onConfirm}>Confirm</Button>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

CreateReminder.propTypes = {
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onClose: PropTypes.func
};

export default CreateReminder;
