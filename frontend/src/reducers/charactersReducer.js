import {
    GET_CHARACTERS,
    ADD_CHARACTER,
    UPDATE_CHARACTER,
    DELETE_CHARACTER
} from '../actions/characterActions'

export default function charactersReducer(state = {}, action) {
    const newState = {...state }
    switch (action.type) {
        case GET_CHARACTERS:
            return action.characters
        case ADD_CHARACTER:
            return {...state, ...action.character }
        case UPDATE_CHARACTER:
            newState[action.character.id] = action.character
            return newState
        case DELETE_CHARACTER:
            delete newState[action.character.id]
            return newState
        default:
            return state
    }
}