// ACTIONS
export const GET_CREATIONS = "GET_CREATIONS"
export const GET_CHRONICLES = "GET_CHRONICLES"
export const ADD_CHRONICLE = "ADD_CHRONICLE"
export const UPDATE_CHRONICLE = "UPDATE_CHRONICLE"
export const DELETE_CHRONICLE = "DELETE_CHRONICLE"


// ACTION CREATORS
export const getCreations = (content) => ({ type: GET_CREATIONS, content })
export const getChronicles = (chronicles) => ({ type: GET_CHRONICLES, chronicles })
export const addChronicle = (chronicle) => ({ type: ADD_CHRONICLE, chronicle })
export const updateChronicle = (chronicle) => ({ type: UPDATE_CHRONICLE, chronicle })
export const deleteChronicle = (chronicle) => ({ type: DELETE_CHRONICLE, chronicle })