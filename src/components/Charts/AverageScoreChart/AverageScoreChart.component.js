import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import './AverageScoreChart.style.css';
import { PropTypes } from 'prop-types';
export default function AverageScoreChart(props) {
  const { todayScore } = props;

  return (
    <div className='small-chart-container average-score-chart-container'>
      <p className='average-score-chart-title'>Score</p>
      <div className="average-score-chart-score-container">
        <p className='average-score-chart-score'>{todayScore * 100}%</p>
        <p className='average-score-chart-score-subtitle'>de votre<br />objectif</p>
      </div>
      <ResponsiveContainer className='average-score-chart' width={'100%'} height={'100%'}>
        <PieChart width={'100%'} height={'100%'}>
          <Pie
            data={[
              { value: todayScore },
              { value: 1 - todayScore }
            ]}
            dataKey="value"
            innerRadius={'65%'}
            cornerRadius={50}
            outerRadius={'75%'}
            startAngle={90}
            endAngle={450}
          >
            <Cell fill={'#ff0101'} radius={50} />
            <Cell fill={'transparent'} radius={50} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

/* A prop type validation. It is saying that the prop `todayScore` must be a number. */
AverageScoreChart.propTypes = {
  todayScore: PropTypes.number.isRequired
}