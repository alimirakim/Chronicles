import {
  GET_PLACES,
  ADD_PLACE,
  UPDATE_PLACE,
  DELETE_PLACE
} from '../actions/placeActions'
import { DELETE_CHRONICLE } from '../actions/chronicleActions'
import { GET_USER_CREATIONS } from '../actions/userActions'


export default function placesReducer(state = {}, action) {
  const newState = { ...state }
  switch (action.type) {
    
    case GET_USER_CREATIONS:
      return action.content.places
    
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
      
    case DELETE_CHRONICLE:
      return Object.values(state).filter(place => action.chronicle.place_ids.includes(place.id))
      
    default:
      return state
  }
}