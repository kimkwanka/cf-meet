/* global describe, test, expect, beforeEach */
import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper = {};

  beforeEach(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents setEventCount={() => {}} eventCount={32} />,
    );
  });

  test('renders a text input field', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('renders a text input field with a default value of 32', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('defaultValue')).toBe(32);
  });
});
