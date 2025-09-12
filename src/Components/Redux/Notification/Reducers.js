import { 
  GET_ALL_NOTIFICATION_RESPONSE, 
  GET_ALL_NOTIFICATION_READ_RESPONSE 
} from "./ActionTypes";

const initialState = {
  error: "",
  getNotificationSuccessfull: "",
};

const Notification = (notification = initialState, action) => {
  switch (action.type) {
        case GET_ALL_NOTIFICATION_RESPONSE:
          return {
            ...notification,
            getNotificationSuccessfull: action.payload, // Store all notifications
          };
          case GET_ALL_NOTIFICATION_READ_RESPONSE:
                  return {
                    ...notification,
                    getNotificationSuccessfull: notification.getNotificationSuccessfull.map((notification) =>
                      notification.id === action.payload.id
                        ? { ...notification, isRead: true } // Mark only this notification as read
                        : notification
                    ),
                  };
            
    default:
      notification = { ...notification };
      break;
  }
  return notification;
};

export default Notification;

// import { 
//   GET_ALL_NOTIFICATION_RESPONSE, 
//   GET_ALL_NOTIFICATION_READ_RESPONSE 
// } from "./ActionTypes";

// const initialState = {
//   error: "",
//   notifications: [], // Renamed for clarity
// };

// const Notification = (state = initialState, action) => {
//   switch (action.type) {
//     case GET_ALL_NOTIFICATION_RESPONSE:
//       return {
//         ...state,
//         notifications: action.payload, // Store all notifications
//       };

//     case GET_ALL_NOTIFICATION_READ_RESPONSE:
//       return {
//         ...state,
//         notifications: state.notifications.map((notification) =>
//           notification.id === action.payload.id
//             ? { ...notification, isRead: true } // Mark only this notification as read
//             : notification
//         ),
//       };

//     default:
//       return state;
//   }
// };

// export default Notification;
