import React, { useEffect, useState } from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations, getEvents } from './api';

const App = () => {
  const [state, setState] = useState({ events: [], locations: [] });

  useEffect(async () => {
    const events = await getEvents();
    setState({ events: [], locations: extractLocations(events) });
  }, []);

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

  return (
    <div className="App">
      <CitySearch locations={state.locations} updateEvents={updateEvents} />
      <NumberOfEvents />
      <EventList events={state.events} />
    </div>
  );
};

export default App;
