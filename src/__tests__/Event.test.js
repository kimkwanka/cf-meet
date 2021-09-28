/* global describe, test, expect, beforeAll */
import React from 'react';
import { shallow } from 'enzyme';

import Event from '../components/App/EventList/Event/Event';
import mockData from '../services/mock-data';

describe('<Event /> component', () => {
  let EventWrapper = {};

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('renders basic event information', () => {
    const event = mockData[0];

    expect(EventWrapper.find('.event-title').text()).toBe(event.summary);
    expect(EventWrapper.find('.event-start').text()).toBe(event.start.dateTime);
    expect(EventWrapper.find('.event-location').text()).toBe(
      `@${event.summary} | ${event.location}`,
    );
    expect(EventWrapper.find('.event-details').length).toBe(0);
  });

  test('renders detailed event information upon clicking the details button', () => {
    const event = mockData[0];

    expect(EventWrapper.find('.event-details').length).toBe(0);

    EventWrapper.find('.event-details-button').simulate('click');

    expect(EventWrapper.find('.event-details').length).toBe(1);

    expect(EventWrapper.find('.event-link').prop('href')).toBe(event.htmlLink);
    expect(EventWrapper.find('.event-description').text()).toBe(
      event.description,
    );
  });
});
