import {
  GET_RANKS,
  ADD_RANK,
  UPDATE_RANK,
  DELETE_RANK,
} from '../actions/rankActions'
import {
  ADD_THREAD,
  UPDATE_THREAD,
  DELETE_THREAD
} from '../actions/threadActions'
import { DELETE_TALE } from '../actions/taleActions'
import { DELETE_CHRONICLE } from '../actions/chronicleActions'

export default function ranksReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {

    case GET_RANKS:
      return action.ranks
    case ADD_RANK:
      newState[action.rank.id] = action.rank
      return newState
    case UPDATE_RANK:
      newState[action.rank.id] = action.rank
      return newState
    case DELETE_RANK:
      delete newState[action.rank.id]
      return newState

    // case ADD_THREAD:
    //   Object.values(action.ranks).forEach(rank => newState[rank.id] = rank)
    //   return newState
    // case UPDATE_THREAD:
    //   newState = Object.values(state).filter(rank => rank.thread_id !== action.thread.id)
    //   Object.values(action.ranks).forEach(rank => newState[rank.id] = rank)
    //   return newState
    // case DELETE_THREAD:
    //   return Object.values(state).filter(rank => rank.thread_id !== action.thread.id)

    // case DELETE_TALE:
    //   return Object.values(state).filter(rank => action.tale.thread_ids.includes(rank.thread_id))

    // case DELETE_CHRONICLE:
    // return Object.values(state).filter(rank => action.chronicle.tale_ids.includes(...?))

    default:
      return state
  }
}