/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle() {
    return {
      color: this.color,
    };
  }

  render() {
    const { text } = this.props;
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
  }
}

class WarningAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'orange';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
  }
}

Alert.propTypes = {
  text: PropTypes.string.isRequired,
};

export { InfoAlert, WarningAlert, ErrorAlert };
