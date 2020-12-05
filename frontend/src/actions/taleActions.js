// ACTIONS
export const GET_TALES = "GET_TALES"
export const ADD_TALE = "ADD_TALE"
export const UPDATE_TALE = "UPDATE_TALE"
export const DELETE_TALE = "DELETE_TALE"


// ACTION CREATORS
export const getTales = (tales) => ({ type: GET_TALES, tales })
export const addTale = (tale) => ({ type: ADD_TALE, tale })
export const updateTale = (tale) => ({ type: UPDATE_TALE, tale })
export const deleteTale = (tale) => ({ type: DELETE_TALE, tale })