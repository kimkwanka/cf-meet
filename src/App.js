import React, { useEffect, useState } from 'react';

import './App.css';
import 'nprogress/nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';

import EventsScatterPlot from './EventsScatterPlot';
import EventGenre from './EventGenre';

import {
  extractLocations, getEvents, getAccessToken, checkToken,
} from './api';

const isTestEnvironment = true
  || process.env.NODE_ENV === 'test'
  || navigator.userAgent === 'puppeteer';

const App = () => {
  const [events, setEvents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [eventCount, setEventCount] = useState(32);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

  useEffect(() => {
    const doAsyncStuff = async () => {
      let code = '';
      let isTokenValid = false;

      if (!isTestEnvironment) {
        const accessToken = localStorage.getItem('access_token');
        isTokenValid = !(await checkToken(accessToken)).error;
        const searchParams = new URLSearchParams(window.location.search);
        code = searchParams.get('code');

        setShowWelcomeScreen(!(code || isTokenValid));
      }

      if (code || isTokenValid || isTestEnvironment) {
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
        setLocations(extractLocations(fetchedEvents));
      }
    };
    doAsyncStuff();
  }, []);

  const updateEvents = async (location) => {
    const fetchedEvents = await getEvents();
    const locationEvents = location === 'all'
      ? fetchedEvents
      : fetchedEvents.filter((event) => event.location === location);

    setEvents(locationEvents);
  };

  const currentEvents = events.slice(0, eventCount);

  const getScatterPlotData = () => {
    const data = locations.map((location) => {
      const number = currentEvents.filter(
        (event) => event.location === location,
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });

    return data;
  };
  console.log(currentEvents)
  return (
    <div className="App">
      <CitySearch locations={locations} updateEvents={updateEvents} />
      <NumberOfEvents setEventCount={setEventCount} eventCount={eventCount} />
      <h4>Events in each city</h4>

      <div className="data-vis-wrapper">
        <EventsScatterPlot data={getScatterPlotData()} />
        <EventGenre events={currentEvents} />
      </div>
      {/* <EventList events={currentEvents} /> */}
      {showWelcomeScreen && <WelcomeScreen getAccessToken={getAccessToken} />}
    </div>
  );
};

export default App;
