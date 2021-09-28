/* global describe, test, expect */
import React from 'react';
import { shallow } from 'enzyme';

import EventList from '../components/App/EventList/EventList';
import Event from '../components/App/EventList/Event/Event';
import mockData from '../services/mock-data';

describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
});
