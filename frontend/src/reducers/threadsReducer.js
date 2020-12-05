import {
    GET_THREADS,
    ADD_THREAD,
    UPDATE_THREAD,
    DELETE_THREAD
} from '../actions/threadActions'


export default function threadsReducer(state = {}, action) {
    const newState = {...state }
    switch (action.type) {
        case GET_THREADS:
            return action.threads
        case ADD_THREAD:
            newState[action.thread.id] = action.thread
            return newState
        case UPDATE_THREAD:
            newState[action.thread.id] = action.thread
            return newState
        case DELETE_THREAD:
            delete newState[action.thread.id]
            return newState
        default:
            return state
    }
}