import * as actionTypes from "./actionTypes";
import initialState from "../reducers/initialState";

export function getEditChoices() {
    return {type: actionTypes.GET_EDIT_CHOICES, payload: initialState.editChoices};
}

export function getEditChoice(){
    return {type: actionTypes.GET_EDIT_CHOICE, payload: initialState.currentEditChoice};    
}

export function changeEditChoice(choice){
    initialState.currentEditChoice = choice;
    return {type: actionTypes.CHANGE_EDIT_CHOICE, payload: choice};
}
