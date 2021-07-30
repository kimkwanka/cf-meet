import React from 'react';

const CitySearch = () => (
  <div className="city-search">
    <input
      type="text"
      className="city"
    />
    <ul className="suggestions" />
  </div>
);

export default CitySearch;
