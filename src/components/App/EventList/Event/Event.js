import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  return (
    <div className="event">
      <h3 className="event-title">{event.summary}</h3>
      <p className="event-start">{event.start.dateTime}</p>
      <p className="event-location">{`@${event.summary} | ${event.location}`}</p>
      {showDetails && (
        <div className="event-details">
          <h3>About the event:</h3>
          <a className="event-link" href={event.htmlLink}>
            See details on Google Calendar
          </a>
          <p className="event-description">{event.description}</p>
        </div>
      )}
      <button
        type="button"
        className="event-details-button"
        onClick={toggleDetails}
      >
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    start: PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.string.isRequired,
    htmlLink: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Event;
