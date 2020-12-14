import {
  GET_CHRONICLE,
  GET_CHRONICLES,
  ADD_CHRONICLES,
  ADD_CHRONICLE,
  UPDATE_CHRONICLE,
  DELETE_CHRONICLE
} from '../actions/chronicleActions'
import { GET_USER_CREATIONS } from '../actions/userActions'

export default function chroniclesReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {

    case GET_USER_CREATIONS:
      Object.values(action.content.chronicles).forEach(chronicle => newState[chronicle.id] = chronicle)
      return newState
    case GET_CHRONICLE:
      newState[action.chronicle.id] = action.chronicle
      return newState
    case GET_CHRONICLES:
      newState[action.chronicle.id] = action.chronicle
      return newState
    case ADD_CHRONICLES:
      action.chronicles.forEach(chronicle => newState[chronicle.id] = chronicle)
      return newState
    case ADD_CHRONICLE:
      newState[action.chronicle.id] = action.chronicle
      return newState
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