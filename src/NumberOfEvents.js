import React from 'react';

const NumberOfEvents = ({ setEventCount, eventCount }) => {
  const handleInputChange = (e) => {
    setEventCount(e.target.value);
  };

  return (
    <input className="number-of-events" defaultValue={eventCount} onChange={handleInputChange} />
  );
};

export default NumberOfEvents;
