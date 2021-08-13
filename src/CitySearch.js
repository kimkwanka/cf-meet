import React, { useState } from 'react';

import { InfoAlert } from './Alert';

const CitySearch = ({ locations, updateEvents }) => {
  const [state, setState] = useState({
    query: '',
    suggestions: [],
    showSuggestions: false,
    infoText: '',
  });

  const handleInputChange = (e) => {
    const query = e.target.value;
    const suggestions = locations.filter(
      (location) => location.toUpperCase().indexOf(query.toUpperCase()) !== -1,
    );
    const infoText = suggestions.length > 0
      ? ''
      : 'We cannot find the city you are looking for. Please try another city.';

    setState({
      ...state,
      query,
      suggestions,
      infoText,
    });
  };

  const handleSuggestionClick = (suggestion) => () => {
    setState({
      ...state,
      query: suggestion,
      showSuggestions: false,
      infoText: '',
    });
    updateEvents(suggestion);
  };

  const handleFocus = () => {
    setState({ ...state, showSuggestions: true });
  };

  return (
    <div className="city-search">
      <InfoAlert text={state.infoText} />
      <input
        type="text"
        className="city"
        value={state.query}
        onChange={handleInputChange}
        onFocus={handleFocus}
      />
      <ul
        className="suggestions"
        style={state.showSuggestions ? {} : { display: 'none' }}
      >
        {state.suggestions.map((suggestion) => (
          <li key={suggestion} onClick={handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
        <li key="all" onClick={handleSuggestionClick('all')}>
          <b>See all cities</b>
        </li>
      </ul>
    </div>
  );
};

export default CitySearch;
