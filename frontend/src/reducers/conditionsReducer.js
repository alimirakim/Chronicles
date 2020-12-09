import {
  GET_CONDITIONS,
  ADD_CONDITION,
  UPDATE_CONDITION,
  DELETE_CONDITION,
} from '../actions/conditionActions'
import {
  ADD_THREAD,
  UPDATE_THREAD,
  DELETE_THREAD
} from '../actions/threadActions'
import { DELETE_TALE } from '../actions/taleActions'
import { DELETE_CHRONICLE } from '../actions/chronicleActions'

export default function conditionsReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {

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

    // case ADD_THREAD:
    //   Object.values(action.conditions).forEach(condition => newState[condition.id] = condition)
    //   return newState
    // case UPDATE_THREAD:
    //   newState = Object.values(state).filter(condition => condition.thread_id !== action.thread.id)
    //   Object.values(action.conditions).forEach(condition => newState[condition.id] = condition)
    //   return newState
    // case DELETE_THREAD:
    //   return Object.values(state).filter(condition => condition.thread_id !== action.condition.id)

    // case DELETE_TALE:
    //   return Object.values(state).filter(condition => action.tale.thread_ids.includes(condition.thread_id))

    // case DELETE_CHRONICLE:
    // return Object.values(state).filter(condition => action.chronicle.tale_ids.includes(...?))

    default:
      return state
  }
}