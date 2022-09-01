import axios from "axios";
import { USER_ACTIVITY, USER_MAIN_DATA } from "../data/MockedData";

/* It's a class that makes a request to an API and returns the data */
export default class Services {
  /**
   * The constructor function is called when a new instance of the class is created. It sets the
   * profileId property to the value of the id parameter, or null if no id is provided. It also sets
   * the apiURL property to the URL of the API.
   * @param id - the id of the profile you want to get
   */
  constructor(id) {
    this.profileId = id || null;
    this.apiURL = 'http://localhost:3000';
  }

  /* It's a function that makes a request to an API to get the userInfos from userId and returns the data. */
  getUserInfos = async () => {
    return await axios(`${this.apiURL}/user/${this.profileId}`, {
      method: 'GET'
    }).then((response) => {
      return response.data.data;
    }).catch((error) => {
      /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
      if (error) {
        const data = USER_MAIN_DATA.find((user) => user.id === this.profileId);
        if (!data) {
          return {};
        }
        return data;
      }
    });
  }

  /* It's a function that makes a request to an API to get the userActivities from userId and returns
  the data. */
  getUserActivities = async () => {
    return await axios(`${this.apiURL}/user/${this.profileId}/activity`, {
      method: 'GET'
    })
    .then((response) => {
      /**
       * It's sorting the data by date. 
       * @returns The sorted data.
       */
      const sortedData = response.data.data.sessions.sort((a, b) => new Date(b.day) - new Date(a.day)).reverse();
      return sortedData;
    }).catch((error) => {
      /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
      if (error) {
        const data = USER_ACTIVITY.find((user) => user.id === this.profileId);
        if (!data) {
          return {};
        }
        return data;
      }
    })
  }

  /* It's a function that makes a request to an API to get the userSessionsDuration from userId and
  returns the data. */
  getUserSessionsDuration = async () => {
    return await axios(`${this.apiURL}/user/${this.profileId}/average-sessions`, {
      method: 'GET'
    })
    .then((response) => {
      return response.data.data.sessions;
    }).catch((error) => {
      /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
      if (error) {
        const data = USER_ACTIVITY.find((user) => user.id === this.profileId);
        if (!data) {
          return {};
        }
        return data.sessions;
      }
    })
  }

}
