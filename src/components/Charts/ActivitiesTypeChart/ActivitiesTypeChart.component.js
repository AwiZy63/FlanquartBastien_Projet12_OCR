import React from 'react';
import './ActivitiesTypeChart.style.css';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { PropTypes } from 'prop-types';

export default function ActivitiesTypeChart(props) {
  const { userPerformances } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  if (window.innerWidth !== windowWidth) {
    setWindowWidth(window.innerWidth);
  }
  return (
    <div className='small-chart-container activities-type-chart-container'>
      <ResponsiveContainer width='100%' height='100%'>
        <RadarChart outerRadius={'75%'} data={userPerformances}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="activity" stroke="white" dy={4} tickLine={false} tick={{ fontSize: '0.6vw', fontWeight: 500, }} />
          <Radar
            fontStyle={{ fontSize: '12px' }}
            dataKey="value"
            fill="#ff0101"
            fillOpacity={0.7}
            stroke="transparent"
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}

ActivitiesTypeChart.propTypes = {
  userPerformances: PropTypes.arrayOf(PropTypes.shape({
    activity: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired).isRequired
}