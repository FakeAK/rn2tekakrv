export const API_URL = 'https://api.sportsnconnect.com/';

export const API = {
  AUTH: {
    LOGIN: `${API_URL}auth/login`,
    SIGNUP: `${API_URL}auth/register`,
  },
  TRAINING: {
    DETAIL: (id) => `${API_URL}training/${id}`,
  },
  FEED: {
    GET_EVENTS: (page, firstLoad) => `${API_URL}activity/events?page=${page}&firstLoad=${firstLoad}`,
    GET_TRAININGS: (page, firstLoad, latitude, longitude) => {
      let url = `${API_URL}activity/trainings?page=${page}&firstLoad=${firstLoad}`;
      if (latitude && longitude) {
        url = url.concat(`&latitude=${latitude}&longitude=${longitude}`);
      }

      return url;
    },
    GET_STORES: (page, latitude, longitude) => {
      let path = `${API_URL}activity/stores?page=${page}`;
      if (latitude && longitude) {
        path = path.concat(`&latitude=${latitude}&longitude=${longitude}`);
      }
      return path;
    },
  },
  USER: {
    ME: `${API_URL}users/me`,
  },
  NOTIFICATIONS: {
    MARK_ALL_AS_READ: `${API_URL}notifications`,
    GET_NOTIFICATIONS_UNREAD_COUNT: `${API_URL}notifications/count`,
  },
};
