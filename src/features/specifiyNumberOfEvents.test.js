/* eslint-disable import/no-extraneous-dependencies */
/* global expect */
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount } from 'enzyme';

import { act } from 'react-dom/test-utils';

import App from '../components/App/App';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, (test) => {
  test('The default number of events shown is 32', ({ given, when, then }) => {
    let AppWrapper = {};

    given('the list of events has been loaded', async () => {
      await act(async () => {
        AppWrapper = await mount(<App />);
      });
      AppWrapper.update();
    });

    when('the user has not changed the number of events shown', () => {});

    then('the number of event items visible in the list is 32', () => {
      expect(AppWrapper.find('.event-list li').length).toBe(32);
    });
  });

  test('User can change the number of events visible', ({
    given,
    when,
    then,
  }) => {
    let AppWrapper = {};

    given('the list of events has been loaded', async () => {
      await act(async () => {
        AppWrapper = await mount(<App />);
      });
      AppWrapper.update();
    });

    when('the user changes number of events shown', () => {
      AppWrapper.find('.number-of-events-input').simulate('change', {
        target: { value: 5 },
      });
    });

    then(
      "the number of event items visible changes according to the user's input",
      () => {
        expect(AppWrapper.find('.event-list li').length).toBe(5);
      },
    );
  });
});
