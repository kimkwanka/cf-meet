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
        setState({ events, locations: extractLocations(events) });
      }
    });

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="App">
      <EventList events={state.events} />
      <CitySearch locations={state.locations} />
      <NumberOfEvents />
    </div>
  );
};

export default App;
