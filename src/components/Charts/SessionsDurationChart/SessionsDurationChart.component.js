import React from 'react';
import './SessionsDurationChart.style.css';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PropTypes } from 'prop-types';

export default function SessionsDurationChart(props) {
  const { sessions } = props;
  
  return (
    <div className='small-chart-container session-duration-chart-container'>
      <p className="session-duration-chart-title">Durée moyenne des <br />sessions</p>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width='100%' height='100%' data={sessions} margin={{ top: 0, right: 10, bottom: 21, left: 10 }} outerRadius="75%" >
          <CartesianGrid stroke='none' />
          <XAxis tickFormatter={(value, index) => value} tickLine={false} axisLine={false} dataKey="day" stroke="rgba(255, 255, 255, 0.6)" dy={10} tick={true} />
          <YAxis dataKey="sessionLength" hide={true} tick={false} domain={['0', 'dataMax + 40']} />
          <Line dataKey="sessionLength" dot={false} type={"monotone"} strokeWidth={2} stroke="rgba(255, 255, 255, 0.6)" activeDot={{ stroke: "rgba(255, 255, 255, 0.6)", strokeWidth: 10, radius: 5 }} />
          <Tooltip viewBox={{ x: 0, y: 0 }} contentStyle={{ backgroundColor: '#FFFFFF', padding: '6px 8px', border: 'none' }} itemStyle={{ fontSize: '14px', color: 'black', fontWeight: 400 }} labelFormatter={(value) => ""} formatter={(value, name, props) => [`${value}min`]} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
SessionsDurationChart.propTypes = {
  sessions: PropTypes.arrayOf(PropTypes.shape({
    day: PropTypes.string.isRequired,
    sessionLength: PropTypes.number.isRequired
  }).isRequired).isRequired
}