import { ADD_SUBSCRIPTION } from "./ActionTypes";
import { ADD_SUBSCRIPTION_RESPONSE } from "./ActionTypes";


export const addSubscription = (addSubscriptionInfo) => ({
  type: ADD_SUBSCRIPTION,
  payload: addSubscriptionInfo,
});

export const addSubscriptionResponse = (addSubscriptionResponse) => ({
  type: ADD_SUBSCRIPTION_RESPONSE,
  payload: addSubscriptionResponse,
});