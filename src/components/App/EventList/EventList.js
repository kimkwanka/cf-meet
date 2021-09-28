import React from 'react';

import PropTypes from 'prop-types';

import Event from './Event/Event';

import { WarningAlert } from '../../Alert/Alert';

const EventList = ({ events }) => (
  <ul className="event-list">
    {!navigator.onLine && (
      <WarningAlert text="App is offline, cached event list has been loaded." />
    )}
    {events.map((event) => (
      <li key={event.id}>
        <Event event={event} />
      </li>
    ))}
  </ul>
);

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default EventList;
