import {
  GET_EFFECTS,
  ADD_EFFECT,
  UPDATE_EFFECT,
  DELETE_EFFECT,
} from '../actions/effectActions'
// import {
//   ADD_THREAD,
//   UPDATE_THREAD,
//   DELETE_THREAD
// } from '../actions/threadActions'
// import { DELETE_TALE } from '../actions/taleActions'
// import { DELETE_CHRONICLE } from '../actions/chronicleActions'
// import { GET_USER_CREATIONS } from '../actions/userActions'

export default function effectsReducer(state = {}, action) {
  let newState = { ...state }
  switch (action.type) {

    // case GET_USER_CREATIONS:
      // return action.content.effects
    
    case GET_EFFECTS:
      return action.effects
    case ADD_EFFECT:
      newState[action.effect.id] = action.effect
      return newState
    case UPDATE_EFFECT:
      newState[action.effect.id] = action.effect
      return newState
    case DELETE_EFFECT:
      delete newState[action.effect.id]
      return newState

    // case ADD_THREAD:
    //   Object.values(action.effects).forEach(effect => newState[effect.id] = effect)
    //   return newState
    // case UPDATE_THREAD:
    //   newState = Object.values(state).filter(effect => effect.thread_id !== action.thread.id)
    //   Object.values(action.effects).forEach(effect => newState[effect.id] = effect)
    //   return newState
    // case DELETE_THREAD:
    //   return Object.values(state).filter(effect => effect.thread_id !== action.thread.id)

    // case DELETE_TALE:
    //   return Object.values(state).filter(effect => action.tale.thread_ids.includes(effect.thread_id))

    // case DELETE_CHRONICLE:
    // return Object.values(state).filter(effect => action.chronicle.tale_ids.includes(...?))

    default:
      return state
  }
}
