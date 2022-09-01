import React, { useEffect } from 'react'
import Navbar from './components/Navigation/Navbar/Navbar.component'
import Sidebar from './components/Navigation/Sidebar/Sidebar.component'
import { useState } from 'react'
import Services from './services/ApiHandler.service'
import { useNavigate } from 'react-router-dom'
import Loading from './components/Loading/Loading.component'
import Dashboard from './components/Dashboard/Dashboard.component'
import { PropTypes } from "prop-types";
import './App.css';

export default function App(props) {
  const navigate = useNavigate();
  /* Destructuring the props object to get the id property. */
  const { id } = props;
  const apiHandler = new Services(id);
  const [userData, setUserData] = useState({});
  const [userActivities, setUserActivities] = useState({});
  const [userSessionsDuration, setUserSessionsDuration] = useState({});

  useEffect(() => {
    /**
     * It fetches the user's data from the API and if the response is not an object or if the object is
     * empty, it redirects the user to the id selection page
     * @returns The user data is being returned.
     */
     const fetchUserInfos = async () => {
      const response = await apiHandler.getUserInfos();
      if (typeof (response) !== 'object' || Object.keys(response).length <= 0) {
        return navigate("/");
      };
      return setUserData(response);
    }

    /**
     * It fetches the user's activities from the API and if the response is not an object or if the object is
     * empty, it redirects the user to the id selection page
     * @returns The user data is being returned.
     */
     const fetchUserActivities = async () => {
      const response = await apiHandler.getUserActivities();
      if (typeof (response) !== 'object' || Object.keys(response).length <= 0) {
        return navigate("/");
      };
      return setUserActivities(response);
    }

    /**
     * It fetches the user's sessions duration from the API and if the response is not an object or if the object is
     * empty, it redirects the user to the id selection page
     * @returns The user data is being returned.
     */
    const fetchUserSessionsDuration = async () => {
      const response = await apiHandler.getUserSessionsDuration();
      if (typeof (response) !== 'object' || Object.keys(response).length <= 0) {
        return navigate("/");
      };
      return setUserSessionsDuration(response);
    }

    /* It fetches the user's data from the API and if the response is not an object or if the object is
    empty, it redirects the user to the id selection page */
    fetchUserInfos()
    
    fetchUserActivities()

    fetchUserSessionsDuration()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* While all data are not fetched, the page will show a loading screen. */
  if (Object.keys(userData).length > 0 && Object.keys(userActivities).length > 0 && userSessionsDuration.length > 0) {
    // console.log(userData)
    // console.log(userActivities);
    // console.log(userSessionsDuration)
    return (
      <div className='page-wrapper'>
        <Navbar />
        <Sidebar />
        <div className="main-wrapper">
          <Dashboard cardInfos={userData["keyData"]} todayScore={userData["todayScore"] || userData["score"]} userInfos={userData["userInfos"]} userActivities={userActivities} userSessionsDuration={userSessionsDuration} />
        </div>
      </div>
    )
  } else {
    return (
      <div className='page-wrapper'>
        <Navbar />
        <Sidebar />
        <div className="main-wrapper">
          <Loading />
        </div>
      </div>
    )
  }
}

/* A prop type validation. It is checking if the id is a number and if it is required. */
App.propTypes = {
  id: PropTypes.number.isRequired
}