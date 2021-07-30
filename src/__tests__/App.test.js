/* global describe, test, expect, beforeAll */
import React from 'react';
import { shallow, mount } from 'enzyme';

import { act } from 'react-dom/test-utils';

import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

import mockData from '../mock-data';
import { extractLocations, getEvents } from '../api';

// From: https://github.com/enzymejs/enzyme/issues/2073
const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    wrapper.update();
  });
};

describe('<App /> component', () => {
  let AppWrapper = {};

  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {
  test('App passes "events" state as a prop to EventList', async () => {
    const AppWrapper = mount(<App />);
    let allEvents = [];

    // From: https://stackoverflow.com/questions/59147444/trigger-useeffect-in-jest-testing
    await act(async () => {
      allEvents = await getEvents();
    });
    AppWrapper.update();

    expect(allEvents).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', async () => {
    const AppWrapper = mount(<App />);
    let locations = [];

    await act(async () => {
      locations = extractLocations(await getEvents());
    });
    AppWrapper.update();

    expect(locations).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(locations);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    let CitySearchWrapper = {};

    // await act(async () => {
    // locations = extractLocations(await getEvents());
    // });
    // AppWrapper.update();
    let allEvents = [];
    let locations = [];
    await act(async () => {
      allEvents = await getEvents();
      locations = extractLocations(allEvents);
    });
    AppWrapper.update();

    // CitySearchWrapper needs to be defined after AppWrapper.update() so useEffect() to take effect
    CitySearchWrapper = AppWrapper.find(CitySearch);
    expect(CitySearchWrapper.props().locations).toEqual(locations);

    CitySearchWrapper.find('.city').simulate('change', { target: { value: 'b' } });

    const suggestions = CitySearchWrapper.find('.suggestions li');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = CitySearchWrapper.find('.suggestions li').at(selectedIndex).text();
    console.log(suggestions.length, selectedIndex, selectedCity);
    const selectedSuggestion = CitySearchWrapper.find('.suggestions li').at(selectedIndex);

    selectedSuggestion.simulate('click', { });

    const eventsToShow = allEvents.filter((event) => event.location === selectedCity);
    expect(CitySearchWrapper.prop('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });
});
