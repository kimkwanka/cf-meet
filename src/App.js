import React, { useEffect, useState } from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations, getEvents } from './api';

const App = () => {
  const [state, setState] = useState({ events: [], locations: [], eventCount: 32 });

  useEffect(async () => {
    const events = await getEvents();
    setState({ ...state, events, locations: extractLocations(events) });
  }, []);

  const setEventCount = (n) => {
    setState({ ...state, eventCount: n });
  };

  const updateEvents = async (location) => {
    const events = await getEvents();
    const locationEvents = (location === 'all')
      ? events
      : events.filter((event) => event.location === location);

    setState({
      ...state,
      events: locationEvents,
    });
  };

  const currentEvents = state.events.slice(0, state.eventCount);

  return (
    <div className="App">
      <CitySearch locations={state.locations} updateEvents={updateEvents} />
      <NumberOfEvents setEventCount={setEventCount} eventCount={state.eventCount} />
      <EventList events={currentEvents} />
    </div>
  );
};

export default App;
