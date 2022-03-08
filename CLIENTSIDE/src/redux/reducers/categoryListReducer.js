import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function changeCategoryReducer(state=initialState.categories, action){
    // reducers returns me the state, i manage state changes with this;
    switch (action.type) {
        case actionTypes.GET_CATEGORIES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}