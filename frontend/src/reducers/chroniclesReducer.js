import {
    GET_CHRONICLES,
    ADD_CHRONICLE,
    UPDATE_CHRONICLE,
    DELETE_CHRONICLE
} from '../actions/chronicleActions'


export default function chroniclesReducer(state = {}, action) {
    const newState = {...state }
    switch (action.type) {
        case GET_CHRONICLES:
            return action.chronicles
        case ADD_CHRONICLE:
            return {...state, ...action.chronicle }
        case UPDATE_CHRONICLE:
            newState[action.chronicle.id] = action.chronicle
            return newState
        case DELETE_CHRONICLE:
            delete newState[action.chronicle.id]
            return newState
        default:
            return state
    }
}