/* @author : istiklal */

import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function saveProductReducer(
  state = initialState.cartTotal,
  action
) {
  switch (action.type) {
    case actionTypes.CART_TOTAL_AMOUNT:
        return action.payload;
    default:
      return state;
  }
}

