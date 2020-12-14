// ACTIONS
export const GET_CHRONICLE = "GET_CHRONICLE"
export const GET_CHRONICLES = "GET_CHRONICLES"
export const ADD_CHRONICLES = "ADD_CHRONICLES"
export const ADD_CHRONICLE = "ADD_CHRONICLE"
export const UPDATE_CHRONICLE = "UPDATE_CHRONICLE"
export const DELETE_CHRONICLE = "DELETE_CHRONICLE"


// ACTION CREATORS
export const getChronicle = (chronicle, tales) => ({ type: GET_CHRONICLE, chronicle, tales })
export const getChronicles = (chronicles, tales) => ({ type: GET_CHRONICLES, chronicles, tales })
export const addChronicle = (chronicle) => ({ type: ADD_CHRONICLE, chronicle })
export const addChronicles = (chronicles) => ({ type: ADD_CHRONICLES, chronicles })
export const updateChronicle = (chronicle) => ({ type: UPDATE_CHRONICLE, chronicle })
export const deleteChronicle = (chronicle) => ({ type: DELETE_CHRONICLE, chronicle })