import {
  GET_ERRORS,
  ADD_ERROR,
  UPDATE_ERROR,
  DELETE_ERROR,
  WIPE_ERRORS
} from '../actions/errorActions'

export default function errorsReducer(state = [], action) {
  const newState = { ...state }
  switch (action.type) {
    case GET_ERRORS:
      return action.errors
    case ADD_ERROR:
      newState[action.error.id] = action.error
      return newState
    case UPDATE_ERROR:
      newState[action.error.id] = action.error
      return newState
    case DELETE_ERROR:
      delete newState[action.error.id]
      return newState
    case WIPE_ERRORS:
      return []
    default:
      return state
  }
}