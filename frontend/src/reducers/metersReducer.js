import {
  GET_METERS,
  ADD_METER,
  UPDATE_METER,
  DELETE_METER,
} from '../actions/meterActions'
// import {
//   ADD_THREAD,
//   UPDATE_THREAD,
//   DELETE_THREAD
// } from '../actions/threadActions'
// import { DELETE_TALE } from '../actions/taleActions'
// import { DELETE_CHRONICLE } from '../actions/chronicleActions'
// import { GET_USER_CREATIONS } from '../actions/userActions'

export default function metersReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {
    
    // case GET_USER_CREATIONS:
      // return action.content.meters

    case GET_METERS:
      return action.meters
    case ADD_METER:
      newState[action.meter.id] = action.meter
      return newState
    case UPDATE_METER:
      newState[action.meter.id] = action.meter
      return newState
    case DELETE_METER:
      delete newState[action.meter.id]
      return newState

    // case ADD_THREAD:
    //   Object.values(action.meters).forEach(meter => newState[meter.id] = meter)
    //   return newState
    // case UPDATE_THREAD:
    //   newState = Object.values(state).filter(meter => meter.thread_id !== action.thread.id)
    //   Object.values(action.meters).forEach(meter => newState[meter.id] = meter)
    //   return newState
    // case DELETE_THREAD:
    //   return Object.values(state).filter(meter => meter.thread_id !== action.thread.id)

    // case DELETE_TALE:
    //   return Object.values(state).filter(meter => action.tale.thread_ids.includes(meter.thread_id))

    // case DELETE_CHRONICLE:
    // return Object.values(state).filter(meter => action.chronicle.tale_ids.includes(...?))

    default:
      return state
  }
}