import axios from "axios";
import { USER_ACTIVITY, USER_AVERAGE_SESSIONS, USER_MAIN_DATA, USER_PERFORMANCE } from "../data/MockedData";

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
    // Use Mocked API : true / false / 'auto'
    this.useMockedApi = 'auto';
  }

  /* It's a function that makes a request to an API to get the userInfos from userId and returns the data. */
  getUserInfos = async () => {
    let response = {};

    if (this.useMockedApi && this.useMockedApi.toString() === 'true') {
      const data = await USER_MAIN_DATA.find((user) => user.id === this.profileId);

      /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
      if (!data || Object.keys(data).length <= 0) {
        response = {};
      }

      response = data;
    } else if (!this.useMockedApi || this.useMockedApi === 'auto') {
      response = await axios(`${this.apiURL}/user/${this.profileId}`, {
        method: 'GET'
      }).then((response) => {
        const data = response.data.data;

        /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
        if (!data) {
          return {};
        }

        return data;
      }).catch(async (error) => {
        /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
        if (error && (error.code === 'ERR_BAD_REQUEST' || error.code === 'ERR_NETWORK')) {
          /* It's returning the data from the mocked data. */
          if (this.useMockedApi === 'auto') {
            const data = await USER_MAIN_DATA.find((user) => user.id === this.profileId);

            /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
            if (!data || Object.keys(data).length <= 0) {
              return {};
            }

            return data;
          } else {
            return {};
          }
        }
      });
    }

    /* It's checking if the response is empty or not. If it's empty, it's returning an empty object. */
    if (!response || Object.keys(response).length <= 0) {
      return {};
    }

    /* It's formatting the data to be used in the Card component. */
    const cardInfos = response["keyData"];
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

    /* It's formatting the data to be used in the App. */
    const formattedData = {
      userInfos: response.userInfos,
      keyData: formattedCardInfos,
      todayScore: response.todayScore || response.score
    };

    return formattedData;
  }

  /**
   * It's a function that makes a request to an API to get the userActivities from userId and returns
   * the data.
   * @returns sorted data at date format */
  getUserActivities = async () => {
    let response = {};

    if (this.useMockedApi && this.useMockedApi.toString() === 'true') {
      const data = await USER_ACTIVITY.find((user) => user.userId === this.profileId);

      /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
      if (!data || Object.keys(data).length <= 0) {
        response = {};
      }

      response = data.sessions;
    } else if (!this.useMockedApi || this.useMockedApi === 'auto') {
      response = await axios(`${this.apiURL}/user/${this.profileId}/activity`, {
        method: 'GET'
      })
        .then((response) => {
          const data = response.data.data;

          /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
          if (!data) {
            return {};
          }

          return data.sessions;
        }).catch(async (error) => {
          /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
          if (error && (error.code === 'ERR_BAD_REQUEST' || error.code === 'ERR_NETWORK')) {
            /* It's returning the data from the mocked data. */
            if (this.useMockedApi === 'auto') {
              const data = await USER_ACTIVITY.find((user) => user.userId === this.profileId);

              /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
              if (!data || Object.keys(data).length <= 0) {
                return {};
              }
              return data.sessions;
            } else {
              return {};
            }
          }
        })
    }


    /* It's checking if the response is empty or not. If it's empty, it's returning an empty object. */
    if (!response || Object.keys(response).length <= 0) {
      return {};
    }

    /* It's sorting the sessions by date. */
    return response.sort((a, b) => new Date(b.day) - new Date(a.day)).reverse()
  }

  /* It's a function that makes a request to an API to get the userSessionsDuration from userId and
  returns the data. */
  getUserSessionsDuration = async () => {
    let response = {};

    if (this.useMockedApi && this.useMockedApi.toString() === 'true') {
      const data = await USER_AVERAGE_SESSIONS.find((user) => user.userId === this.profileId);

      /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
      if (!data || Object.keys(data).length <= 0) {
        response = {};
      }

      response = data.sessions;
    } else if (!this.useMockedApi || this.useMockedApi === 'auto') {
      response = await axios(`${this.apiURL}/user/${this.profileId}/average-sessions`, {
        method: 'GET'
      })
        .then((response) => {
          const data = response.data.data;

          /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
          if (!data) {
            return {};
          }

          return data.sessions;
        }).catch(async (error) => {
          /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
          if (error && (error.code === 'ERR_BAD_REQUEST' || error.code === 'ERR_NETWORK')) {
            /* It's returning the data from the mocked data. */
            if (this.useMockedApi === 'auto') {
              const data = await USER_AVERAGE_SESSIONS.find((user) => user.userId === this.profileId);

              /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
              if (!data || Object.keys(data).length <= 0) {
                return {};
              }

              return data.sessions;
            } else {
              return {};
            }
          }
        })
    }

    const formattedData = [];
    if (Object.keys(response).length > 0) {
      /* It's a loop that iterates over the response and pushes the data to the formattedData array. */
      for (const item of response) {
        const data = {
          day: item.day === 1 ? 'L' :
            item.day === 2 || item.day === 3 ? 'M' :
              item.day === 4 ? 'J' :
                item.day === 5 ? 'V' :
                  item.day === 6 ? 'S' : 'D',
          sessionLength: item.sessionLength
        }
        formattedData.push(data);
      }
    }

    return formattedData;
  }

  /* It's a function that makes a request to an API to get the userPerformances from userId and returns
  the data. */
  getUserPerformances = async () => {
    let response = {};

    if (this.useMockedApi && this.useMockedApi.toString() === 'true') {
      const data = await USER_PERFORMANCE.find((user) => user.userId === this.profileId);

      /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
      if (!data || Object.keys(data).length <= 0) {
        response = {};
      }

      response = { kind: data.kind, data: data.data };
    } else if (!this.useMockedApi || this.useMockedApi === 'auto') {
      response = await axios(`${this.apiURL}/user/${this.profileId}/performance`, {
        method: 'GET'
      })
        .then((response) => {
          const data = response.data.data;

          /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
          if (!data) {
            return {};
          }

          return { kind: data.kind, data: data.data };
        }).catch(async (error) => {
          /* It's a fallback in case the API is down. It's returning the data from the mocked data. */
          if (error && (error.code === 'ERR_BAD_REQUEST' || error.code === 'ERR_NETWORK')) {
            /* It's returning the data from the mocked data. */
            if (this.useMockedApi === 'auto') {
              const data = await USER_PERFORMANCE.find((user) => user.userId === this.profileId);

              /* It's checking if the data is empty or not. If it's empty, it's returning an empty object. */
              if (!data || Object.keys(data).length <= 0) {
                return {};
              }

              return { kind: data.kind, data: data.data };
            } else {
              return {};
            }
          }
        });
    }

    /* It's a constant that contains the activities name. */
    const activitiesName = {
      1: 'Cardio',
      2: 'Energie',
      3: 'Endurance',
      4: 'Force',
      5: 'Vitesse',
      6: 'Intensité'
    }

    let formattedData = [];

    /* It's a loop that iterates over the response and pushes the data to the formattedData array. */
    if (Object.keys(response).length > 0) {
      for (const item in activitiesName) {
        const activityName = activitiesName[item];

        for (const value in response.data) {
          const dataValue = response.data[value];

          /* It's checking if the dataValue.kind is equal to the item. If it's true, it's pushing the
          data to the formattedData array. */
          if (dataValue.kind === parseInt(item)) {
            formattedData.push({
              activity: activityName,
              value: dataValue.value
            });
          }
        }
      }

      return formattedData.reverse();
    }
  }
}