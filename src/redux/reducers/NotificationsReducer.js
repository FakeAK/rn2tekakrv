const initialState = { notifications_count: 0 };

function NotificationsReducer(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'NOTIFICATIONS_COUNT':
      nextState = {
        ...state,
        notifications_count: action.notifications_count,
      };

      return nextState || state;
    default:
      return state;
  }
}

export default NotificationsReducer;
