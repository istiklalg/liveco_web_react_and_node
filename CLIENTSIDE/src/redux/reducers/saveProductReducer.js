/** @author : istiklal */
// eğer eklenen ürünün döndürülmesine ihtiyacımız yoksa reducer yazmaya da
// gerek olmayacaktır, sadece action yazmak bize yeter.

import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function saveProductReducer(
  state = initialState.savedProduct,
  action
) {
  // reducer bana state döndürür;
  switch (action.type) {
    case actionTypes.UPDATE_PRODUCT_SUCCESS:
      return action.payload;
    case actionTypes.CREATE_PRODUCT_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
