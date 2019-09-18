// Create a second reducer to manage the logged in user's data
// Get logged in user's data from the server, store that info in the redux store, and display the user's first and last name in the nav bar
import axios from "axios";

// initial state
const initialState = {
  email: null,
  firstName: null,
  lastName: null
};

// create an action type
const REQUEST_USER_DATA = "REQUEST_USER_DATA";

// create an action creator function (named requestUserData) that makes an http request for user data;
export const requestUserData = () => {
  // the action that is returned from the action creator should have type and payload properties.
  // the payload should be the response from the http request
  let data = axios.get("/auth/user-data").then(res => res.data);
  return {
    type: REQUEST_USER_DATA,
    payload: data
  };
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${REQUEST_USER_DATA}_FULFILLED`:
      // destructure email, firstName, and lastName from payload
      const { email, firstName, lastName } = action.payload.user;
      return {
        email,
        firstName,
        lastName
      };
    default:
      return state;
  }
}
