import {
    GET_USER_DETAILS_RESPONSE, UPDATE_USER_PROFILE_DETAILS
  } from "./ActionTypes";

  const initialState = {
    error: "",
    getUserInformation: "",
    UpdateUserProfileDetails: ""
  };
  
  const UserProfile = (user = initialState, action) => {
          switch (action.type) {
              case GET_USER_DETAILS_RESPONSE:
              user = {
                  ...user,
                  getUserInformation: action.payload,
              };
              break;
              case UPDATE_USER_PROFILE_DETAILS:
              user = {
                  ...user,
                  UpdateUserProfileDetails: action.payload,
              };
              break;
              default:
              user = { ...user };
              break;
          }
          return user;
  };
  
  export default UserProfile;
  