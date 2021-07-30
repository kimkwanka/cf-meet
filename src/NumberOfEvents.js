import React, { useState } from 'react';

const NumberOfEvents = () => {
  const [nEvents, setNEvents] = useState(32);

  const handleInputChange = (e) => {
    setNEvents(e.target.value);
  };

  return (
    <input className="number-of-events" value={nEvents} onChange={handleInputChange} />
  );
};

export default NumberOfEvents;
