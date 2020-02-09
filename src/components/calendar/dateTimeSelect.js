import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalendarDateTimeSelect extends Component {
  render() {
    return (
      <div>
        Date/Time picker
      </div>
    );
  }
}

CalendarDateTimeSelect.propTypes = {
  activeDate: PropTypes.object
};

export default CalendarDateTimeSelect;