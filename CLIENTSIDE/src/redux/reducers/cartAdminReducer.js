import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function cartReducer(state = initialState.carts, action) {
  switch (action.type) {
    case actionTypes.GET_CARTS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}