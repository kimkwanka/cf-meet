import React from 'react';

import Event from './Event';

import { WarningAlert } from './Alert';

const EventList = ({ events }) => (
  <ul className="event-list">
    {!navigator.onLine && <WarningAlert text="App is offline, cached event list has been loaded." />}
    {events.map((event) => <li key={event.id}><Event event={event} /></li>)}
  </ul>
);

export default EventList;
