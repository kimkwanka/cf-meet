/* global describe, test, expect, beforeAll */
import React from 'react';
import { shallow, mount } from 'enzyme';

import { act } from 'react-dom/test-utils';

import App from '../components/App/App';
import EventList from '../components/App/EventList/EventList';
import CitySearch from '../components/App/CitySearch/CitySearch';
import NumberOfEvents from '../components/App/NumberOfEvents/NumberOfEvents';

import { extractLocations, getEvents } from '../services/api';

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
  test('App passes eventCount state as a prop to NumberOfEvents', async () => {
    const AppWrapper = mount(<App />);

    await act(async () => {
      await new Promise(setImmediate);
    });
    AppWrapper.update();

    expect(AppWrapper.find(NumberOfEvents).props().eventCount).toEqual(32);
    AppWrapper.unmount();
  });

  test('App passes "events" state as a prop to EventList', async () => {
    const AppWrapper = mount(<App />);
    let allEvents = [];

    // From: https://stackoverflow.com/questions/59147444/trigger-useeffect-in-jest-testing
    await act(async () => {
      allEvents = await getEvents();
      allEvents = allEvents.slice(0, 32);
    });
    AppWrapper.update();

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

    let allEvents = [];
    let locations = [];

    await act(async () => {
      allEvents = await getEvents();
      locations = extractLocations(allEvents);
    });
    AppWrapper.update();

    // https://github.com/enzymejs/enzyme/blob/master/docs/guides/migration-from-2-to-3.md#element-referential-identity-is-no-longer-preserved
    // Due to referential identity not being preserved by enzyme,
    // we need to re-find() the CitySearch component after state changes
    // and can't just define
    // const CitySearchWrapper = AppWrapper.find(CitySearch);

    expect(AppWrapper.find(CitySearch).props().locations).toEqual(locations);

    await act(async () => {
      await AppWrapper.find(CitySearch)
        .find('.city')
        .simulate('change', { target: { value: '' } });
    });
    AppWrapper.update();

    const suggestions = AppWrapper.find(CitySearch).find('.suggestions li');

    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = AppWrapper.find(CitySearch)
      .find('.suggestions li')
      .at(selectedIndex)
      .text();

    const selectedSuggestion = AppWrapper.find(CitySearch)
      .find('.suggestions li')
      .at(selectedIndex);

    await act(async () => {
      await selectedSuggestion.simulate('click', {});
    });
    AppWrapper.update();

    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity,
    );

    expect(AppWrapper.find(EventList).props().events).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);

    let allEvents = [];

    await act(async () => {
      allEvents = await getEvents();
      const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
      await suggestionItems.at(0).simulate('click');
      allEvents = allEvents.slice(0, 32);
    });
    AppWrapper.update();

    expect(AppWrapper.find(EventList).props().events).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('the amount of events shown changes when the input text changes', async () => {
    const AppWrapper = mount(<App />);

    await act(async () => {
      await new Promise(setImmediate);
    });
    AppWrapper.update();

    expect(AppWrapper.find(EventList).props().events).toHaveLength(32);

    const eventObject = {
      target: {
        value: 5,
      },
    };

    AppWrapper.find('.number-of-events-input').simulate('change', eventObject);

    expect(AppWrapper.find(EventList).props().events).toHaveLength(5);
    AppWrapper.unmount();
  });
});
