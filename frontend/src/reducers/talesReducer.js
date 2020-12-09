import {
  GET_TALES,
  ADD_TALE,
  UPDATE_TALE,
  DELETE_TALE
} from '../actions/taleActions'
import { DELETE_CHRONICLE } from '../actions/chronicleActions'


export default function talesReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    case GET_TALES:
      return action.tales
    case ADD_TALE:
      newState[action.tale.id] = action.tale
      return newState
    case UPDATE_TALE:
      newState[action.tale.id] = action.tale
      return newState
    case DELETE_TALE:
      delete newState[action.tale.id]
      return newState
    
    case DELETE_CHRONICLE:
      return Object.values(state).filter(tale => tale.chronicle_id !== action.chronicle.id)
      
    default:
      return state
  }
}