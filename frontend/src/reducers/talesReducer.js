import {
    GET_TALES,
    ADD_TALE,
    UPDATE_TALE,
    DELETE_TALE
} from '../actions/taleActions'


export default function talesReducer(state = {}, action) {
    const newState = {...state }
    switch (action.type) {
        case GET_TALES:
            return action.tales
        case ADD_TALE:
            return {...state, ...action.tale }
        case UPDATE_TALE:
            newState[action.tale.id] = action.tale
            return newState
        case DELETE_TALE:
            delete newState[action.tale.id]
            return newState
        default:
            return state
    }
}