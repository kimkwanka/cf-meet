import React from 'react';

import { ErrorAlert } from './Alert';

const NumberOfEvents = ({ setEventCount, eventCount }) => {
  const handleInputChange = (e) => {
    setEventCount(e.target.value);
  };

  return (
    <div className="number-of-events">
      {eventCount > 200 && <ErrorAlert text="Please enter a number between 1 and 200." />}
      <input className="number-of-events-input" defaultValue={eventCount} onChange={handleInputChange} />
    </div>
  );
};

export default NumberOfEvents;
