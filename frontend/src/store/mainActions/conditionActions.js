// ACTIONS
export const GET_CONDITIONS = "GET_CONDITIONS"
export const ADD_CONDITION = "ADD_CONDITION"
export const UPDATE_CONDITION = "UPDATE_CONDITION"
export const DELETE_CONDITION = "DELETE_CONDITION"


// ACTION CREATORS
export const getConditions = (conditions) => ({ type: GET_CONDITIONS, conditions })
export const addCondition = (condition) => ({ type: ADD_CONDITION, condition })
export const updateCondition = (condition) => ({ type: UPDATE_CONDITION, condition })
export const deleteCondition = (condition) => ({ type: DELETE_CONDITION, condition })