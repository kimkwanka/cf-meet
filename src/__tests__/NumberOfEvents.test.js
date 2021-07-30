/* global describe, test, expect, beforeEach */
import React from 'react';
import { shallow } from 'enzyme';

import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper = {};

  beforeEach(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents />,
    );
  });

  test('renders a text input field', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events')).toHaveLength(1);
  });

  test('renders a text input field with a default value of 32', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(32);
  });

  test('text input correctly reflects changes', () => {
    const eventObject = {
      target: {
        value: 64,
      },
    };
    NumberOfEventsWrapper.find('.number-of-events').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.find('.number-of-events').prop('value')).toBe(64);
  });
});
