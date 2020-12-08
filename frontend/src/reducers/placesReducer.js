import {
  GET_PLACES,
  ADD_PLACE,
  UPDATE_PLACE,
  DELETE_PLACE
} from '../actions/placeActions'

export default function placesReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    case GET_PLACES:
      return action.places
    case ADD_PLACE:
      newState[action.place.id] = action.place
      return newState
    case UPDATE_PLACE:
      newState[action.place.id] = action.place
      return newState
    case DELETE_PLACE:
      delete newState[action.place.id]
      return newState
    default:
      return state
  }
}