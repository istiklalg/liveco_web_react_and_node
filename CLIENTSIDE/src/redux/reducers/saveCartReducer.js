/** @author : istiklal */
// eğer eklenen ürünün döndürülmesine ihtiyacımız yoksa reducer yazmaya da
// gerek olmayacaktır, sadece action yazmak bize yeter.

import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function saveCartReducer(
  state = initialState.savedCart,
  action
) {
  switch (action.type) {
    case actionTypes.UPDATE_CART_SUCCESS:
      return action.payload;
    case actionTypes.CREATE_CART_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
