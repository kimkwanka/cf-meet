import React, { useState } from 'react';

const CitySearch = ({ locations, updateEvents }) => {
  const [state, setState] = useState({ query: '', suggestions: [] });

  const handleInputChange = (e) => {
    const query = e.target.value;
    const suggestions = locations.filter(
      (location) => location.toUpperCase().indexOf(query.toUpperCase()) !== -1,
    );
    setState({ ...state, query, suggestions });
  };

  const handleSuggestionClick = (suggestion) => () => {
    setState({ ...state, query: suggestion });
    updateEvents(suggestion);
  };

  return (
    <div className="city-search">
      <input
        type="text"
        className="city"
        value={state.query}
        onChange={handleInputChange}
      />
      <ul className="suggestions">
        {state.suggestions.map((suggestion) => (
          <li
            key={suggestion}
            onClick={handleSuggestionClick(suggestion)}
          >
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
