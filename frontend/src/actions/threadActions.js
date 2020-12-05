export const GET_THREADS = "GET_THREADS"
export const ADD_THREAD = "ADD_THREAD"
export const UPDATE_THREAD = "UPDATE_THREAD"
export const DELETE_THREAD = "DELETE_THREAD"


// ACTION CREATORS
export const getThreads = (threads) => ({ type: GET_THREADS, threads })
export const addThread = (thread) => ({ type: ADD_THREAD, thread })
export const updateThread = (thread) => ({ type: UPDATE_THREAD, thread })
export const deleteThread = (thread) => ({ type: DELETE_THREAD, thread })