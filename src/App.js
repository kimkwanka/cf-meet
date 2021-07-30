import React from 'react';
import './App.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

const App = () => (
  <div className="App">
    <EventList events={[]} />
    <CitySearch />
    <NumberOfEvents />
  </div>
);

export default App;
