import { PropTypes } from 'prop-types';
import React from 'react';
import './Dashboard.style.css';

export default function Dashboard(props) {
  const { userInfos, cardInfos, todayScore, userActivities, userSessionsDuration } = props;
  const { firstName } = userInfos;

  // console.log(cardInfos, todayScore, userActivities, userSessionsDuration);
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div><h2 className='dashboard-header-profile'>Bonjour, <span className='dashboard-header-profile-username'>{firstName}</span></h2></div>
        <p className="dashboard-header-slogan">Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
      </div>
    </div>
  )
}

/* A validation of the props that are passed to the component. */
Dashboard.propTypes = {
  userInfos: PropTypes.shape({
    firstName: PropTypes.string.isRequired
  }).isRequired,
  cardInfos: PropTypes.shape({
    calorieCount: PropTypes.number.isRequired,
    proteinCount: PropTypes.number.isRequired,
    carbohydrateCount: PropTypes.number.isRequired,
    lipidCount: PropTypes.number.isRequired
  }).isRequired,
  
  todayScore: PropTypes.number.isRequired
}