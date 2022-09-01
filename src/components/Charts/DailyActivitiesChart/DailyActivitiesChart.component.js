import React from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import './DailyActivitiesChart.style.css';
import { PropTypes } from 'prop-types';

export default function DailyActivitiesChart(props) {
  const { userActivities } = props;
  console.log(userActivities)
  return (
    <div className='dailyactivities-container'>
      <div className="dailyactivities-header">
        <p className="dailyactivities-header-title">Activité quotidienne</p>
        <div className="dailyactivities-header-legend">
          <p className="dailyactivities-header-legend-weight">Poids (kg)</p>
          <p className="dailyactivities-header-legend-energy">Calories brûlées (kCal)</p>
        </div>
      </div>
      <div className="dailyactivities-charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart className='activities-chart-container' data={userActivities}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#dedede" />
            <XAxis dy={12} dataKey="day" tickFormatter={(value, index) => value.split('-')[2].replace('0', '')} tickLine={false} tick={{ fontSize: 14, fontWeight: 500 }} stroke="#9b9eac" />
            <YAxis
              yAxisId="kg"
              dataKey="kilogram"
              domain={["dataMin - 1", "dataMax + 2"]}
              allowDecimals={false}
              dx={16}
              tickCount={3}
              orientation="right"
              stroke="#9b9eac"
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              hide={true}
              dataKey="calories"
              domain={[0, "dataMax + 50"]}
            />
            <Tooltip viewBox={{ x: 0, y: 0 }} contentStyle={{ backgroundColor: '#E60000', padding: '8px 6px', border: 'none' }} itemStyle={{ fontSize: '12px', color: 'white', fontWeight: 300 }} labelFormatter={(value) => ""} formatter={(value, name, props) => [name === 'kilogram' ? `${value}kg` : name === 'calories' ? `${value}Kcal` : null]} />
            <Bar barSize={7} radius={[50, 50, 0, 0]} dataKey="kilogram" fill="#282D30" />
            <Bar barSize={7} radius={[50, 50, 0, 0]} dataKey="calories" fill="#E60000" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

DailyActivitiesChart.propTypes = {
  userActivities: PropTypes.arrayOf(PropTypes.shape({
    calories: PropTypes.number.isRequired,
    day: PropTypes.string.isRequired,
    kilogram: PropTypes.number.isRequired
  }).isRequired).isRequired
}