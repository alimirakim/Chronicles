import {
  GET_CONDITIONS,
  ADD_CONDITION,
  UPDATE_CONDITION,
  DELETE_CONDITION,
} from '../mainActions/conditionActions'
import { DELETE_CHRONICLE } from '../mainActions/chronicleActions'
import { GET_USER_CREATIONS } from '../mainActions/userActions'


export default function conditionsReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {

    case GET_USER_CREATIONS:
      Object.values(action.content.conditions).forEach(condition => newState[condition.id] = condition)
      return newState
    
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
      return Object.values(state).filter(cond => !action.chronicle.condition_ids.includes(cond.id))

    default:
      return state
  }
}