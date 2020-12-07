import {
  GET_CHOICES,
  ADD_CHOICE,
  UPDATE_CHOICE,
  DELETE_CHOICE,
} from '../actions/choiceActions'
import {
  ADD_THREAD,
  UPDATE_THREAD,
  DELETE_THREAD
} from '../actions/threadActions'
import { DELETE_TALE } from '../actions/taleActions'
import { DELETE_CHRONICLE } from '../actions/chronicleActions'

export default function choicesReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {
    
    case GET_CHOICES:
      return action.choices
    case ADD_CHOICE:
      newState[action.choice.id] = action.choice
      return newState
    case UPDATE_CHOICE:
      newState[action.choice.id] = action.choice
      return newState
    case DELETE_CHOICE:
      delete newState[action.choice.id]
      return newState

    case ADD_THREAD:
      action.choices.forEach(choice => newState[choice.id] = choice)
      return newState
    case UPDATE_THREAD:
      newState = state.filter(choice => choice.current_thread_id !== action.thread.id)
      action.choices.forEach(choice => newState[choice.id] = choice)
      return newState
    case DELETE_THREAD:
      return state.filter(choice => choice.current_thread_id !== action.thread.id)

    case DELETE_TALE:
      return state.filter(choice => action.tale.thread_ids.includes(choice.current_thread_id))

    case DELETE_CHRONICLE:
    // return state.filter(choice => ???)

    default:
      return state
  }
}