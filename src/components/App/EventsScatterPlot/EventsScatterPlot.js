import React from 'react';

import PropTypes from 'prop-types';

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const EventsScatterPlot = ({ data }) => (
  <ResponsiveContainer height={400}>
    <ScatterChart
      width={800}
      height={400}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type="category" dataKey="city" name="city" />
      <YAxis
        type="number"
        dataKey="number"
        name="number of events"
        allowDecimals={false}
      />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="A school" data={data} fill="#8884d8" />
    </ScatterChart>
  </ResponsiveContainer>
);

EventsScatterPlot.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default EventsScatterPlot;
