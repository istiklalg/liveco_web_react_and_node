import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function loginUserReducer(
  state = initialState.currentUser,
  action
) {
  switch (action.type) {
    case actionTypes.AUTH_USER_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
