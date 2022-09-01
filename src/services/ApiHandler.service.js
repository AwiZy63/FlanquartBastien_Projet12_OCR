import axios from "axios";
import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA } from "../data/MockedData";

/* It's a class that makes a request to an API and returns the data */
export default class Services {
  /**
   * The constructor function is called when a new instance of the class is created. It sets the
   * profileId property to the value of the id parameter, or null if no id is provided. It also sets
   * the apiURL property to the URL of the API.
   * @param id - the id of the profile you want to get
   */
  constructor(id) {
    this.profileId = parseInt(id) || null;
    this.apiURL = 'http://localhost:3000';
  }

  /* It's a function that makes a request to an API to get the userInfos from userId and returns the data. */
  getUserInfos = async () => {
    return await axios(`${this.apiURL}/user/${this.profileId}`, {
      method: 'GET'
    }).then((response) => {
      const data = response.data.data;

      const cardInfos = data["keyData"];
      const cardInfosMap = new Map(Object.entries(cardInfos));
      const cardInfosKeys = Object.keys(cardInfos);
      const formattedCardInfos = [];

      cardInfosMap.forEach((value) => {
        cardInfosKeys.forEach((key) => {
          if (cardInfos[key] === value) {
            let unit = '';
            let label = '';
            if (key === "calorieCount") {
              unit = 'kCal';
              label = 'Calories';
            } else if (key === "proteinCount") {
              unit = 'g';
              label = 'Proteines';
            } else if (key === "carbohydrateCount") {
              unit = 'g';
              label = 'Glucides';
            } else if (key === "lipidCount") {
              unit = 'g';
              label = 'Lipides';
            }
            formattedCardInfos.push({ key, value, label, unit })
          }
        })
      });

      const formattedData = {
        userInfos: data.userInfos,
        keyData: formattedCardInfos,
        todayScore: data.todayScore || data.score
      };
      return formattedData;
    }).catch(async (error) => {
      /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
      if (error && (error.code === 'ERR_BAD_REQUEST' || error.code === 'ERR_NETWORK')) {
        const data = await USER_MAIN_DATA.find((user) => user.id === this.profileId);

        if (!data || Object.keys(data).length <= 0) {
          return {};
        }

        const cardInfos = data["keyData"];
        const cardInfosMap = new Map(Object.entries(cardInfos));
        const cardInfosKeys = Object.keys(cardInfos);
        const formattedCardInfos = [];

        cardInfosMap.forEach((value) => {
          cardInfosKeys.forEach((key) => {
            if (cardInfos[key] === value) {
              let unit = '';
              let label = '';
              if (key === "calorieCount") {
                unit = 'kCal';
                label = 'Calories';
              } else if (key === "proteinCount") {
                unit = 'g';
                label = 'Proteines';
              } else if (key === "carbohydrateCount") {
                unit = 'g';
                label = 'Glucides';
              } else if (key === "lipidCount") {
                unit = 'g';
                label = 'Lipides';
              }
              formattedCardInfos.push({ key, value, label, unit })
            }
          })
        });

        const formattedData = {
          userInfos: data.userInfos,
          keyData: formattedCardInfos,
          todayScore: data.todayScore || data.score
        };
        return formattedData;
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
      }).catch(async (error) => {
        /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
        if (error && (error.code === 'ERR_BAD_REQUEST' || error.code === 'ERR_NETWORK')) {
          const data = await USER_ACTIVITY.find((user) => user.userId === this.profileId);

          if (!data || Object.keys(data).length <= 0) {
            return {};
          }
          return data.sessions.sort((a, b) => new Date(b.day) - new Date(a.day)).reverse();
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
      }).catch(async (error) => {
        /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
        if (error && (error.code === 'ERR_BAD_REQUEST' || error.code === 'ERR_NETWORK')) {
          const data = await USER_AVERAGE_SESSIONS.find((user) => user.userId === this.profileId);

          if (!data || Object.keys(data).length <= 0) {
            return {};
          }
          return data.sessions;
        }
      })
  }

}
