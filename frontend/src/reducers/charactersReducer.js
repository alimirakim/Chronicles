import {
  GET_CHARACTERS,
  ADD_CHARACTER,
  UPDATE_CHARACTER,
  DELETE_CHARACTER
} from '../actions/characterActions'
import { DELETE_CHRONICLE } from '../actions/chronicleActions'
import { GET_USER_CREATIONS } from '../actions/userActions'


export default function charactersReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    
    case GET_USER_CREATIONS:
        return action.content.characters
        
    case GET_CHARACTERS:
      return action.characters
    case ADD_CHARACTER:
      newState[action.character.id] = action.character
      return newState
    case UPDATE_CHARACTER:
      newState[action.character.id] = action.character
      return newState
    case DELETE_CHARACTER:
      delete newState[action.character.id]
      return newState
      
    case DELETE_CHRONICLE:
        return Object.values(state).filter(char => !action.chronicle.character_ids.includes(char.id))
      
    default:
      return state
  }
}