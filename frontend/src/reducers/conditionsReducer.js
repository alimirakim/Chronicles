import {
  GET_CONDITIONS,
  ADD_CONDITION,
  UPDATE_CONDITION,
  DELETE_CONDITION,
} from '../actions/conditionActions'
import { GET_CREATIONS, DELETE_CHRONICLE } from '../actions/chronicleActions'

export default function conditionsReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {

    case GET_CREATIONS:
      return action.content.conditions
    
    case GET_CONDITIONS:
      return action.conditions
    case ADD_CONDITION:
      newState[action.condition.id] = action.condition
      return newState
    case UPDATE_CONDITION:
      newState[action.condition.id] = action.condition
      return newState
    case DELETE_CONDITION:
      delete newState[action.condition.id]
      return newState

    case DELETE_CHRONICLE:
      return Object.values(state).filter(cond => !action.chronicle.entity_ids.includes(cond.id))

    default:
      return state
  }
}