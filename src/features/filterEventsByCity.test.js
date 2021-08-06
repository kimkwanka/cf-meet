/* eslint-disable import/no-extraneous-dependencies */
/* global expect */
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';

import { act } from 'react-dom/test-utils';

import App from '../App';
import CitySearch from '../CitySearch';

import mockData from '../mock-data';

import { extractLocations } from '../api';

const feature = loadFeature('./src/features/filterEventsByCity.feature');

defineFeature(feature, (test) => {
  test('When user hasn’t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    let AppWrapper = {};
    given('user hasn’t searched for any city', () => {

    });

    when('the user opens the app', async () => {
      await act(async () => {
        AppWrapper = await mount(<App />);
      });
      AppWrapper.update();
    });

    then('the user should see the list of upcoming events.', () => {
      expect(AppWrapper.find('.event')).toHaveLength(32);
      AppWrapper.unmount();
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    let CitySearchWrapper = {};
    let locations = [];
    given('the main page is open', () => {
      locations = extractLocations(mockData);
      CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} locations={locations} />);
    });

    when('the user starts typing in the city textbox', async () => {
      CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
    });

    then('the user should receive a list of cities (suggestions) that match what they’ve typed', () => {
      expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
    });
  });

  test('User can select a city from the suggested list', ({
    given, and, when, then,
  }) => {
    let AppWrapper;

    given('user was typing “Berlin” in the city textbox', async () => {
      await act(async () => {
        AppWrapper = await mount(<App />);
      });
      AppWrapper.update();

      await act(async () => {
        await AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
      });

      AppWrapper.update();
    });

    and('the list of suggested cities is showing', () => {
      expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
    });

    when('the user selects a city (e.g., “Berlin, Germany”) from the list', async () => {
      await act(async () => {
        await AppWrapper.find('.suggestions li').at(0).simulate('click');
      });
      AppWrapper.update();
    });

    then('their city should be changed to that city (i.e., “Berlin, Germany”)', () => {
      expect(AppWrapper.find('.city').prop('value')).toBe('Berlin, Germany');
    });

    and('the user should receive a list of upcoming events in that city', () => {
      expect(AppWrapper.find('.event')).toHaveLength(32);
    });
  });
});
