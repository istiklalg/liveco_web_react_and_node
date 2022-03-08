import * as actionTypes from "../actions/actionTypes";
import initialState from "./initialState";

export default function editChoiceReducer(state=initialState.editChoices, action){
    // reducers returns me the state, i manage state changes with this;
    switch (action.type) {
        case actionTypes.CHANGE_EDIT_CHOICE:
            return action.payload;
        case actionTypes.GET_EDIT_CHOICE:
            return action.payload;
        default:
            return state;
    }
}