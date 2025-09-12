import { REGISTRATION, REGISTRATION_RESPONSE, REGISTRATION_RESPONSE_CLEAR } from "./ActionTypes";

export const userCreate = (CreateUserInfo) => ({ 
  type: REGISTRATION,
  payload: CreateUserInfo,
});

export const userCreateResponse = (CreateUserResponse) => ({
  type: REGISTRATION_RESPONSE,
  payload: CreateUserResponse,
});

// export const clearCreateResponse = () => ({
//   type: REGISTRATION_RESPONSE_CLEAR,
// });
