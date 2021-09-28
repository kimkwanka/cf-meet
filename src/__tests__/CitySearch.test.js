/* global describe, test, expect, beforeEach */
import React from 'react';
import { shallow } from 'enzyme';

import CitySearch from '../components/App/CitySearch/CitySearch';
import { extractLocations } from '../services/api';
import mockData from '../services/mock-data';

describe('<CitySearch /> component', () => {
  let CitySearchWrapper = {};
  let locations = [];

  beforeEach(() => {
    locations = extractLocations(mockData);
    CitySearchWrapper = shallow(
      <CitySearch locations={locations} updateEvents={() => {}} />,
    );
  });

  test('renders a list of suggestions', () => {
    expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
  });

  test('render list of suggestions correctly', () => {
    const eventObject = {
      target: {
        value: '',
      },
    };
    CitySearchWrapper.find('.city').simulate('change', eventObject);

    const suggestions = locations;

    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(
      suggestions.length + 1,
    );
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(
        suggestions[i],
      );
    }
  });

  test('suggestion list match the query when changed', () => {
    const query = 'Berlin';
    const eventObject = {
      target: {
        value: query,
      },
    };
    CitySearchWrapper.find('.city').simulate('change', eventObject);

    const filteredLocations = locations.filter(
      (location) => location.toUpperCase().indexOf(query.toUpperCase()) !== -1,
    );
    expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(
      filteredLocations.length + 1,
    );
    for (let i = 0; i < filteredLocations.length; i += 1) {
      expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(
        filteredLocations[i],
      );
    }
  });

  test('render text input', () => {
    expect(CitySearchWrapper.find('.city')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    const eventObject = {
      target: {
        value: 'Munich',
      },
    };

    CitySearchWrapper.find('.city').simulate('change', eventObject);
    expect(CitySearchWrapper.find('.city').prop('value')).toBe('Munich');
  });

  test('change state when text input changes', () => {
    const initialEventObject = {
      target: {
        value: 'Munich',
      },
    };
    CitySearchWrapper.find('.city').simulate('change', initialEventObject);

    const finalEventObject = { target: { value: 'Berlin' } };
    CitySearchWrapper.find('.city').simulate('change', finalEventObject);
    expect(CitySearchWrapper.find('.city').prop('value')).toBe('Berlin');
  });

  test('selecting a suggestion should change query state', () => {
    const query = 'Berlin';
    const eventObject = {
      target: {
        value: query,
      },
    };
    CitySearchWrapper.find('.city').simulate('change', eventObject);

    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    const firstSuggestion = CitySearchWrapper.find('.suggestions li')
      .at(0)
      .text();
    expect(CitySearchWrapper.find('.city').prop('value')).toBe(firstSuggestion);
  });

  test('selecting CitySearch input reveals the suggestions list', () => {
    CitySearchWrapper.find('.city').simulate('focus');
    expect(CitySearchWrapper.find('.suggestions').prop('style')).not.toEqual({
      display: 'none',
    });
  });

  test('selecting a suggestion should hide the suggestions list', () => {
    const query = 'Berlin';
    const eventObject = {
      target: {
        value: query,
      },
    };
    CitySearchWrapper.find('.city').simulate('change', eventObject);
    CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
    expect(CitySearchWrapper.find('.suggestions').prop('style')).toEqual({
      display: 'none',
    });
  });
});
