import React from 'react';

import PropTypes from 'prop-types';

import { ErrorAlert } from '../../Alert/Alert';

const NumberOfEvents = ({ setEventCount, eventCount }) => {
  const handleInputChange = (e) => {
    setEventCount(parseInt(e.target.value, 10));
  };

  return (
    <div className="number-of-events">
      {(eventCount > 200 || eventCount < 0) && (
        <ErrorAlert text="Please enter a number between 1 and 200." />
      )}
      <input
        className="number-of-events-input"
        defaultValue={parseInt(eventCount, 10)}
        onChange={handleInputChange}
      />
    </div>
  );
};

NumberOfEvents.propTypes = {
  setEventCount: PropTypes.func.isRequired,
  eventCount: PropTypes.number.isRequired,
};

export default NumberOfEvents;
