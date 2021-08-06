/* eslint-disable import/no-extraneous-dependencies */
/* global expect */
import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow } from 'enzyme';

import Event from '../Event';

import mockData from '../mock-data';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, (test) => {
  test('User can show an event\'s details', ({ given, when, then }) => {
    let EventWrapper = {};

    given('the event\'s details are hidden', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      expect(EventWrapper.find('.event-details').length).toBe(0);
    });

    when('the user clicks on the event\'s Show Details button', () => {
      EventWrapper.find('.event-details-button').simulate('click');
    });

    then('the event\'s details will be shown', () => {
      expect(EventWrapper.find('.event-details').length).toBe(1);
    });
  });

  test('User can hide an event\'s details', ({ given, when, then }) => {
    let EventWrapper = {};

    given('the event\'s details are shown', () => {
      EventWrapper = shallow(<Event event={mockData[0]} />);
      EventWrapper.find('.event-details-button').simulate('click');
      expect(EventWrapper.find('.event-details').length).toBe(1);
    });

    when('the user clicks on the event\'s Hide Details button', () => {
      EventWrapper.find('.event-details-button').simulate('click');
    });

    then('the event\'s details will be shown', () => {
      expect(EventWrapper.find('.event-details').length).toBe(0);
    });
  });
});
