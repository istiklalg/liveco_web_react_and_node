import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function editChoicesListReducer(state=initialState.editChoices, action){
    // reducers returns me the state, i manage state changes with this;
    switch (action.type) {
        case actionTypes.GET_EDIT_CHOICES:
            return action.payload;
        default:
            return state;
    }
}