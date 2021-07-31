import React, { useEffect, useState, useRef } from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations, getEvents } from './api';

const App = () => {
  const [state, setState] = useState({ events: [], locations: [] });
  const isMounted = useRef(false);

  useEffect(async () => {
    isMounted.current = true;

    getEvents().then((events) => {
      if (isMounted.current) {
        setState({ events: [], locations: extractLocations(events) });
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  const updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all')
        ? events
        : events.filter((event) => event.location === location);
      setState({
        ...state,
        events: locationEvents,
      });
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
