import { PropTypes } from 'prop-types';
import React from 'react';
import AverageScoreChart from '../Charts/AverageScoreChart/AverageScoreChart.component';
import ActivitiesTypeChart from '../Charts/ActivitiesTypeChart/ActivitiesTypeChart.component';
import DailyActivitiesChart from '../Charts/DailyActivitiesChart/DailyActivitiesChart.component';
import SessionsDurationChart from '../Charts/SessionsDurationChart/SessionsDurationChart.component';
import InfoCards from '../InfoCards/InfoCards.component';
import './Dashboard.style.css';

export default function Dashboard(props) {
  const { userInfos, cardInfos, todayScore, userActivities, userSessionsDuration } = props;
  const { firstName } = userInfos;

  // console.log(cardInfos, todayScore, userActivities, userSessionsDuration);
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className='dashboard-header-profile'>Bonjour <span className='dashboard-header-profile-username'>{firstName}</span></h2>
        <p className="dashboard-header-slogan">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-charts">
          <DailyActivitiesChart userActivities={userActivities} />
          <div className="dashboard-small-charts">
            <SessionsDurationChart />
            <ActivitiesTypeChart />
            <AverageScoreChart />
          </div>
        </div>
        <div className="dashboard-cards">
          <InfoCards cardInfos={cardInfos} />
        </div>
      </div>
    </div>
  )
}

/* A validation of the props that are passed to the component. */
Dashboard.propTypes = {
  userInfos: PropTypes.shape({
    firstName: PropTypes.string.isRequired
  }).isRequired,
  cardInfos: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }).isRequired).isRequired,
  todayScore: PropTypes.number.isRequired
}